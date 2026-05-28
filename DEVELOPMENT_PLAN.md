# План разработки CRUD сущностей

## Обзор

Реализация админ-панели с полной поддержкой CRUD операций для сущностей DummyJSON API.

### Сущности для реализации

| Сущность | List | View | Create | Edit | Delete | Фильтры                       |
| -------- | ---- | ---- | ------ | ---- | ------ | ----------------------------- |
| Products | ✓    | ✓    | ✓      | ✓    | ✓      | search, category, price range |
| Users    | ✓    | ✓    | ✓      | ✓    | ✓      | search, role                  |
| Posts    | ✓    | ✓    | ✓      | ✓    | ✓      | search, userId                |
| Todos    | ✓    | ✓    | ✓      | ✓    | ✓      | completed, userId             |
| Recipes  | ✓    | ✓    | ✓      | ✓    | ✓      | search, tags, mealType        |

---

## Фаза 1: Shared инфраструктура

### 1.1 Базовые типы пагинации и фильтрации

**Файл:** `src/shared/types/api.types.ts`

```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

interface PaginationParams {
  limit: number;
  skip: number;
}

interface SortParams {
  sortBy?: string;
  order?: "asc" | "desc";
}
```

### 1.2 Универсальный хук для таблиц

**Файл:** `src/shared/hooks/useTableData.ts`

- Управление пагинацией (page, pageSize)
- Управление сортировкой
- Интеграция с Ant Design Table
- Синхронизация с URL query params

### 1.3 Reusable UI компоненты

**Файлы в** `src/shared/ui/`:

- `DataTable.tsx` - обёртка над Ant Design Table с пагинацией
- `PageHeader.tsx` - заголовок страницы с breadcrumbs и actions
- `ConfirmDeleteModal.tsx` - модалка подтверждения удаления
- `FilterPanel.tsx` - панель фильтров с кнопками Apply/Reset
- `EntityForm.tsx` - базовая обёртка для форм создания/редактирования

### 1.4 Расширение endpoints и queryKeys

**Файлы:** `src/api/endpoints.ts`, `src/api/queryKeys.ts`

Добавить константы для всех сущностей.

---

## Фаза 2: Products (референсная реализация)

### 2.1 Типы

**Файл:** `src/features/products/model/products.types.ts`

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductFilters {
  q?: string; // search query
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

### 2.2 API слой

**Файл:** `src/features/products/model/products.api.ts`

- `getProducts(params)` - список с пагинацией и фильтрами
- `getProduct(id)` - получение одного продукта
- `createProduct(data)` - создание
- `updateProduct(id, data)` - обновление
- `deleteProduct(id)` - удаление
- `getCategories()` - список категорий для фильтра

### 2.3 React Query хуки

**Файлы:**

- `src/features/products/model/products.queries.ts`
- `src/features/products/model/products.mutations.ts`

```typescript
// queries
useProductsQuery(params);
useProductQuery(id);
useCategoriesQuery();

// mutations
useCreateProductMutation();
useUpdateProductMutation();
useDeleteProductMutation();
```

### 2.4 Страницы

**Файлы в** `src/features/products/pages/`:

| Файл                    | Route                      | Описание             |
| ----------------------- | -------------------------- | -------------------- |
| `ProductsListPage.tsx`  | `/admin/products`          | Таблица + фильтры    |
| `ProductViewPage.tsx`   | `/admin/products/:id`      | Просмотр деталей     |
| `ProductCreatePage.tsx` | `/admin/products/create`   | Форма создания       |
| `ProductEditPage.tsx`   | `/admin/products/:id/edit` | Форма редактирования |

### 2.5 Компоненты

**Файлы в** `src/features/products/ui/`:

- `ProductsTable.tsx` - таблица с колонками
- `ProductsFilters.tsx` - фильтры (поиск, категория, цена)
- `ProductForm.tsx` - форма для create/edit
- `ProductCard.tsx` - карточка для view страницы

---

## Фаза 3: Users

### 3.1 Типы

```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  address: Address;
  company: Company;
  role: "admin" | "moderator" | "user";
}

interface UserFilters {
  q?: string;
  role?: string;
}
```

### 3.2 Страницы

| Route                   | Описание              |
| ----------------------- | --------------------- |
| `/admin/users`          | Список пользователей  |
| `/admin/users/:id`      | Просмотр профиля      |
| `/admin/users/create`   | Создание пользователя |
| `/admin/users/:id/edit` | Редактирование        |

---

## Фаза 4: Posts

### 4.1 Типы

```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}

interface PostFilters {
  q?: string;
  userId?: number;
}
```

### 4.2 Страницы

| Route                   | Описание       |
| ----------------------- | -------------- |
| `/admin/posts`          | Список постов  |
| `/admin/posts/:id`      | Просмотр поста |
| `/admin/posts/create`   | Создание поста |
| `/admin/posts/:id/edit` | Редактирование |

---

## Фаза 5: Todos

### 5.1 Типы

```typescript
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoFilters {
  completed?: boolean;
  userId?: number;
}
```

### 5.2 Страницы

| Route                   | Описание        |
| ----------------------- | --------------- |
| `/admin/todos`          | Список задач    |
| `/admin/todos/:id`      | Просмотр задачи |
| `/admin/todos/create`   | Создание задачи |
| `/admin/todos/:id/edit` | Редактирование  |

---

## Фаза 6: Recipes

### 6.1 Типы

```typescript
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  mealType: string[];
}

interface RecipeFilters {
  q?: string;
  tags?: string;
  mealType?: string;
}
```

### 6.2 Страницы

| Route                     | Описание         |
| ------------------------- | ---------------- |
| `/admin/recipes`          | Список рецептов  |
| `/admin/recipes/:id`      | Просмотр рецепта |
| `/admin/recipes/create`   | Создание рецепта |
| `/admin/recipes/:id/edit` | Редактирование   |

---

## Фаза 7: Навигация и финализация

### 7.1 Обновление AdminLayout

- Sidebar с навигацией по сущностям
- Иконки для каждого раздела
- Активное состояние текущего раздела

### 7.2 Обновление роутинга

**Файл:** `src/app/routes/AppRoutes.tsx`

```typescript
<Route path="admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />

  <Route path="products">
    <Route index element={<ProductsListPage />} />
    <Route path="create" element={<ProductCreatePage />} />
    <Route path=":id" element={<ProductViewPage />} />
    <Route path=":id/edit" element={<ProductEditPage />} />
  </Route>

  <Route path="users">...</Route>
  <Route path="posts">...</Route>
  <Route path="todos">...</Route>
  <Route path="recipes">...</Route>
</Route>
```

### 7.3 Dashboard

Главная страница админки со статистикой:

- Количество сущностей каждого типа
- Быстрые ссылки на разделы

---

## Структура файлов после реализации

```
src/features/
├── auth/           # (существует)
├── products/
│   ├── model/
│   │   ├── products.api.ts
│   │   ├── products.queries.ts
│   │   ├── products.mutations.ts
│   │   └── products.types.ts
│   ├── pages/
│   │   ├── ProductsListPage.tsx
│   │   ├── ProductViewPage.tsx
│   │   ├── ProductCreatePage.tsx
│   │   └── ProductEditPage.tsx
│   └── ui/
│       ├── ProductsTable.tsx
│       ├── ProductsFilters.tsx
│       ├── ProductForm.tsx
│       └── ProductCard.tsx
├── users/
│   └── ... (аналогичная структура)
├── posts/
│   └── ...
├── todos/
│   └── ...
└── recipes/
    └── ...
```

---

## Порядок реализации

1. **Фаза 1** - Shared инфраструктура (базовые компоненты и хуки)
2. **Фаза 2** - Products (полная реализация как референс)
3. **Фаза 3-6** - Остальные сущности (по аналогии с Products)
4. **Фаза 7** - Навигация, роутинг, dashboard

## API Reference

Base URL: `https://dummyjson.com`

| Метод  | Endpoint                    | Описание            |
| ------ | --------------------------- | ------------------- |
| GET    | `/products?limit=10&skip=0` | Список с пагинацией |
| GET    | `/products/search?q=phone`  | Поиск               |
| GET    | `/products/:id`             | Один продукт        |
| POST   | `/products/add`             | Создание            |
| PUT    | `/products/:id`             | Обновление          |
| DELETE | `/products/:id`             | Удаление            |
| GET    | `/products/categories`      | Категории           |

Аналогичные эндпоинты для `/users`, `/posts`, `/todos`, `/recipes`.
