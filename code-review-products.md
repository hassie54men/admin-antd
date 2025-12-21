# Code Review: src/features/products

## 1. Проблемы в типах

**Файл:** `model/product.types.ts`

### Дублирование интерфейсов

`ProductsListResponse` и `ProductSearchResponse` полностью идентичны:

```typescript
// Текущий код - дублирование
export interface ProductsListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

**Рекомендация:**

```typescript
// Создать общий тип
export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductsListResponse = PaginatedResponse<Product>;
export type ProductSearchResponse = PaginatedResponse<Product>;
```

---

## 2. Проблемы в API слое

**Файл:** `model/product.api.ts`

### Некорректный тип для создания продукта

Функция `addProduct` принимает `id`, хотя при создании ID генерируется сервером:

```typescript
// Текущий код
export const addProduct = async ({
  title,
  price,
  rating,
  category,
  id,  // <-- лишний параметр
}: Product) => { ... }
```

**Рекомендация:**

```typescript
// Создать отдельный тип для создания
export type CreateProductDto = Omit<Product, 'id'>;

export const addProduct = async (data: CreateProductDto) => {
  const res = await apiClient.post<Product>(ENDPOINTS.products.add, data);
  return res.data;
};
```

---

## 3. Проблемы в мутациях

**Файл:** `model/products.mutations.ts`

### Отсутствует инвалидация кэша

После удаления/добавления/обновления продукта кэш не обновляется:

```typescript
// Текущий код - нет инвалидации
export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
  });
}
```

**Рекомендация:**

```typescript
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../api/queryKeys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all
      });
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.single(data.id)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all
      });
    },
  });
}
```

---

## 4. Проблемы в queries

**Файл:** `model/product.queries.ts`

### Двойная обёртка queryKey в массив

```typescript
// Текущий код - ОШИБКА
queryKey: [QUERY_KEYS.products.list()],
// Результат: [["products", "list"]] - неправильно!

// Правильно
queryKey: QUERY_KEYS.products.list(),
// Результат: ["products", "list"]
```

**Рекомендация:** Убрать лишние квадратные скобки:

```typescript
export function useGetProductsQuery() {
  return useQuery<ProductsListResponse>({
    queryKey: QUERY_KEYS.products.list(),  // без []
    queryFn: getProducts,
  });
}

export function useGetSingleProduct(id: number) {
  return useQuery<Product>({
    queryKey: QUERY_KEYS.products.single(id),  // без []
    queryFn: () => getSingleProduct(id),
  });
}

export function useGetSearchProduct(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.products.search(query),  // без []
    queryFn: () => searchProduct(query),
  });
}
```

---

## 5. Возможности переиспользования UI

### 5.1 Дублирование Page Header

Одинаковый паттерн в `ProductCard.tsx`, `ProductForm.tsx`, `ProductUpdateForm.tsx`:

```tsx
// Повторяется везде
<Breadcrumb>
  <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
  <Breadcrumb.Item>{t("products.product")}</Breadcrumb.Item>
</Breadcrumb>
<Flex align={"center"} gap={8} style={{ marginBottom: 16 }}>
  <BackArrowButton />
  <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
    {t("products.product")}
  </Typography>
</Flex>
```

**Рекомендация:** Создать `shared/ui/PageHeader.tsx`:

```tsx
import { Breadcrumb, Flex, Typography } from "antd";
import BackArrowButton from "./BackArrowButton";

interface PageHeaderProps {
  breadcrumbs: { title: string }[];
  title: string;
  showBack?: boolean;
  actions?: React.ReactNode;
}

const PageHeader = ({
  breadcrumbs,
  title,
  showBack = true,
  actions
}: PageHeaderProps) => (
  <>
    <Breadcrumb items={breadcrumbs} />
    <Flex
      align="center"
      justify="space-between"
      gap={8}
      style={{ marginBottom: 16 }}
    >
      <Flex align="center" gap={8}>
        {showBack && <BackArrowButton />}
        <Typography.Title level={4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>
      {actions}
    </Flex>
  </>
);

export default PageHeader;
```

**Использование:**

```tsx
<PageHeader
  breadcrumbs={[
    { title: t("products.products") },
    { title: t("products.product") },
  ]}
  title={t("products.product")}
  actions={
    <Flex gap={10}>
      <Button type="primary">{t("products.edit")}</Button>
      <Button danger type="primary">{t("text.delete")}</Button>
    </Flex>
  }
/>
```

---

### 5.2 Дублирование формы продукта

`ProductForm.tsx` и `ProductUpdateForm.tsx` содержат почти идентичные формы.

**Рекомендация:** Создать `ui/ProductForm.tsx`:

```tsx
import { Button, Card, Col, Flex, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import type { Product } from "../model/product.types";

type ProductFormValues = Omit<Product, 'id'>;

interface ProductFormProps {
  initialValues?: Partial<Product>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  submitText: string;
  onCancel?: () => void;
}

const ProductForm = ({
  initialValues,
  onSubmit,
  isLoading,
  isSubmitting,
  submitText,
  onCancel,
}: ProductFormProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ProductFormValues>();

  return (
    <Card loading={isLoading}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="title"
              label={t("products.title")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="category"
              label={t("products.category")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="price"
              label={t("products.price")}
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="rating"
              label={t("products.rating")}
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: 16, textAlign: "right" }}>
          <Flex gap={10} justify="flex-end">
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {submitText}
            </Button>
            {onCancel && (
              <Button danger type="primary" onClick={onCancel}>
                {t("products.cancelEdit")}
              </Button>
            )}
          </Flex>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
```

---

### 5.3 Хардкод сообщений об ошибках

Смешение языков и отсутствие i18n:

```tsx
// ProductForm.tsx - на русском, без i18n
notification.error({
  message: "Ошибка",
  description: "Не удалось добавить товар",
});

// ProductCard.tsx, ProductUpdateForm.tsx - на английском, без i18n
return <div>PRODUCT LOADING ERROR</div>;
```

**Рекомендация:**

1. Добавить ключи в `public/locales/*/translation.json`:

```json
{
  "error": {
    "title": "Error",
    "productLoad": "Failed to load product",
    "productAdd": "Failed to add product",
    "productUpdate": "Failed to update product"
  }
}
```

2. Использовать i18n:

```tsx
notification.error({
  message: t("error.title"),
  description: t("error.productAdd"),
});

if (isError) {
  return <div>{t("error.productLoad")}</div>;
}
```

---

## 6. Мелкие проблемы

### 6.1 Опечатка в названии переменной

**Файл:** `ui/ProductsTable.tsx:20`

```typescript
const colums = [...]  // Опечатка
const columns = [...]  // Правильно
```

### 6.2 Повторяющиеся inline стили

```tsx
// Повторяется 10+ раз
style={{ flex: 1, minWidth: 200 }}
```

**Рекомендация:** Вынести в константу:

```tsx
const formItemStyle = { flex: 1, minWidth: 200 };

// Использование
<Form.Item style={formItemStyle}>
```

### 6.3 Лишний Fragment

```tsx
// ProductCreateButton.tsx
return (
  <>
    <Button>...</Button>
  </>
);

// Правильно
return <Button>...</Button>;
```

### 6.4 Deprecated Breadcrumb API

```tsx
// Устаревший синтаксис
<Breadcrumb>
  <Breadcrumb.Item>...</Breadcrumb.Item>
</Breadcrumb>

// Современный синтаксис Ant Design 5
<Breadcrumb items={[{ title: '...' }]} />
```

---

## 7. Страницы-обёртки

Все страницы являются тривиальными обёртками:

```tsx
const ProductsListPage = () => <ProductsTable />;
const ProductShowPage = () => <ProductCard />;
const ProductCreatePage = () => <ProductForm />;
const ProductsEditPage = () => <ProductUpdateForm />;
```

**Варианты решения:**

1. **Убрать страницы** - использовать компоненты напрямую в роутах
2. **Добавить логику** - Error Boundaries, meta-теги, аналитику

---

## Сводная таблица рекомендаций

| Приоритет | Проблема | Файл | Действие |
|-----------|----------|------|----------|
| :red_circle: Критично | Двойной массив в queryKey | `product.queries.ts` | Убрать лишние `[]` |
| :red_circle: Критично | Нет инвалидации кэша | `products.mutations.ts` | Добавить `invalidateQueries` |
| :orange_circle: Важно | Дублирование PageHeader | `ProductCard`, `ProductForm`, `ProductUpdateForm` | Создать `PageHeader` компонент |
| :orange_circle: Важно | Дублирование формы | `ProductForm`, `ProductUpdateForm` | Создать `ProductForm` компонент |
| :orange_circle: Важно | Хардкод ошибок | Все UI файлы | Перевести через i18n |
| :yellow_circle: Средне | Дублирование типов | `product.types.ts` | Создать `PaginatedResponse<T>` |
| :yellow_circle: Средне | Лишний `id` в `addProduct` | `product.api.ts` | Создать `CreateProductDto` |
| :green_circle: Мелочи | Опечатка `colums` | `ProductsTable.tsx` | Исправить на `columns` |
| :green_circle: Мелочи | Deprecated Breadcrumb API | Все UI файлы | Использовать `items` prop |
| :green_circle: Мелочи | Лишние Fragments | `ProductCreateButton.tsx` | Убрать `<></>` |