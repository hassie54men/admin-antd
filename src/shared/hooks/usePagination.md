# usePagination

Универсальный хук для работы с пагинацией в таблицах Ant Design и DummyJSON API.

## Возможности

- Синхронизация состояния пагинации с URL (`?page=2&pageSize=20`)
- Автоматическая конвертация `page/pageSize` (Ant Design) в `skip/limit` (DummyJSON API)
- Сброс на первую страницу при изменении `pageSize`
- Сохранение состояния при перезагрузке страницы

## Импорт

```ts
import { usePagination } from "@/shared/hooks/usePagination";
```

## API

### Параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `options.defaultPageSize` | `number` | `10` | Количество элементов на странице по умолчанию |

### Возвращаемые значения

| Поле | Тип | Описание |
|------|-----|----------|
| `page` | `number` | Текущая страница (начиная с 1) |
| `pageSize` | `number` | Количество элементов на странице |
| `paginationParams` | `{ skip: number; limit: number }` | Параметры для API запроса |
| `getTablePaginationConfig` | `(total: number) => TablePaginationConfig` | Функция для получения конфига пагинации таблицы |
| `setPage` | `(page: number) => void` | Установить номер страницы |
| `setPageSize` | `(size: number) => void` | Установить размер страницы |
| `resetPage` | `() => void` | Сбросить на первую страницу |

## Примеры использования

### Базовый пример

```tsx
import { Table } from "antd";
import { usePagination } from "@/shared/hooks/usePagination";
import { useGetProducts } from "../model/product.queries";

const ProductsTable = () => {
  const { paginationParams, getTablePaginationConfig } = usePagination();
  const { data, isLoading } = useGetProducts(paginationParams);

  return (
    <Table
      dataSource={data?.products}
      columns={columns}
      loading={isLoading}
      rowKey="id"
      pagination={getTablePaginationConfig(data?.total ?? 0)}
    />
  );
};
```

### С кастомным размером страницы

```tsx
const { paginationParams, getTablePaginationConfig } = usePagination({
  defaultPageSize: 20,
});
```

### Сброс пагинации при поиске

```tsx
const ProductsTable = () => {
  const { q, setQuery } = useSearchQuery();
  const { paginationParams, getTablePaginationConfig, resetPage } = usePagination();
  const { data, isLoading } = useGetProducts({ ...paginationParams, q });

  const handleSearch = (value: string) => {
    setQuery(value);
    resetPage(); // Сбрасываем на первую страницу при новом поиске
  };

  return (
    <>
      <Input.Search onSearch={handleSearch} />
      <Table
        dataSource={data?.products}
        pagination={getTablePaginationConfig(data?.total ?? 0)}
      />
    </>
  );
};
```

### Полный пример с API

#### 1. API функция

```ts
// features/products/model/product.api.ts
import type { PaginationParams } from "@/shared/hooks/usePagination";

interface GetProductsParams extends PaginationParams {
  q?: string;
}

export const getProducts = async (params: GetProductsParams) => {
  const res = await apiClient.get<ProductsListResponse>(
    ENDPOINTS.products.list,
    { params }
  );
  return res.data;
};
```

#### 2. Query hook

```ts
// features/products/model/product.queries.ts
import type { PaginationParams } from "@/shared/hooks/usePagination";

interface UseGetProductsParams extends PaginationParams {
  q?: string;
}

export function useGetProducts(params: UseGetProductsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: () => getProducts(params),
  });
}
```

#### 3. Query keys

```ts
// api/queryKeys.ts
export const QUERY_KEYS = {
  products: {
    all: ["products"] as const,
    list: (params: { skip: number; limit: number; q?: string }) =>
      [...QUERY_KEYS.products.all, "list", params] as const,
  },
};
```

#### 4. Компонент таблицы

```tsx
// features/products/ui/ProductsTable.tsx
import { Table } from "antd";
import { usePagination } from "@/shared/hooks/usePagination";
import { useSearchQuery } from "@/shared/hooks/useSearchQuery";
import { useGetProducts } from "../model/product.queries";
import { useProductColumns } from "../hooks/useProductColumns";

const ProductsTable = () => {
  const { q } = useSearchQuery();
  const { paginationParams, getTablePaginationConfig } = usePagination();
  const { columns } = useProductColumns();

  const { data, isLoading, isError } = useGetProducts({
    ...paginationParams,
    q,
  });

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <Table
      dataSource={data?.products}
      columns={columns}
      loading={isLoading}
      rowKey="id"
      pagination={getTablePaginationConfig(data?.total ?? 0)}
    />
  );
};

export default ProductsTable;
```

## URL параметры

Хук автоматически синхронизирует состояние с URL:

| URL | Состояние |
|-----|-----------|
| `/products` | `page: 1, pageSize: 10` (дефолтные значения) |
| `/products?page=3` | `page: 3, pageSize: 10` |
| `/products?pageSize=25` | `page: 1, pageSize: 25` |
| `/products?page=2&pageSize=25` | `page: 2, pageSize: 25` |

Дефолтные значения не отображаются в URL для чистоты.

## Типы

```ts
export interface PaginationParams {
  skip: number;
  limit: number;
}

export interface UsePaginationOptions {
  defaultPageSize?: number;
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  paginationParams: PaginationParams;
  getTablePaginationConfig: (total: number) => TablePaginationConfig;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetPage: () => void;
}
```