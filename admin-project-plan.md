# Pet-Проект Админка: Полный План и Задачи

## Обзор проекта

**Цель:** Создать современную админ-панель на базе модульной архитектуры с полной поддержкой CRUD операций, многоязычности и типобезопасностью.

**Рекомендуемый API:** DummyJSON (160+ млн. запросов в месяц) - полнофункциональный mock API с поддержкой всех CRUD операций и реалистичными данными.

**Стек технологий:**

- **Сборка**: Vite
- **Фреймворк**: React 19 + TypeScript
- **Роутинг**: React Router v7
- **UI компоненты**: Ant Design v5
- **Состояние**: Zustand
- **Локализация**: react-i18next
- **Запросы**: TanStack Query (React Query)
- **Формы**: React Hook Form
- **Тестирование**: Vitest

---

## Архитектура проекта

```
admin-app/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   │
│   ├── core/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   └── interceptors.ts
│   │   │
│   │   ├── config/
│   │   │   ├── app.config.ts
│   │   │   └── api.config.ts
│   │   │
│   │   └── errors/
│   │       ├── AppError.ts
│   │       └── errorHandler.ts
│   │
│   ├── shared/
│   │   ├── hooks/
│   │   │   ├── useAppNotification.ts
│   │   │   ├── useAppError.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── types/
│   │   │   └── common.ts
│   │   │
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── pages/
│   │   │   └── types.ts
│   │   │
│   │   ├── products/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── types.ts
│   │   │
│   │   ├── users/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── types.ts
│   │   │
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── pages/
│   │       └── types.ts
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   │
│   ├── pages/
│   │   ├── NotFound.tsx
│   │   └── Error.tsx
│   │
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en/
│   │       │   ├── common.json
│   │       │   ├── products.json
│   │       │   ├── users.json
│   │       │   └── errors.json
│   │       └── ru/
│   │           ├── common.json
│   │           ├── products.json
│   │           ├── users.json
│   │           └── errors.json
│   │
│   └── styles/
│       ├── index.css
│       └── variables.css
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.ts
│
├── public/
├── .env.example
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## Фаза 1: Инициализация и конфигурация проекта

### Задача 1.1: Создание проекта и установка зависимостей

- [ ] Инициализировать проект с помощью `npm create vite@latest admin-app -- --template react-ts`
- [ ] Удалить ненужные файлы и папки (App.css, index.css)
- [ ] Установить все зависимости через pnpm
- [ ] Структурировать корневую папку согласно архитектуре

**Команды:**

```bash
npm create vite@latest admin-app -- --template react-ts
cd admin-app
pnpm install
```

### Задача 1.2: Конфигурация Vite

- [ ] Обновить `vite.config.ts` для оптимальной сборки и разработки
- [ ] Добавить path aliases для удобного импорта
- [ ] Настроить переменные окружения
- [ ] Добавить поддержку .env файлов

**Файл: vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
  },
});
```

### Задача 1.3: Конфигурация TypeScript

- [ ] Обновить `tsconfig.json` с строгими параметрами типизации
- [ ] Добавить пути для path aliases
- [ ] Настроить правильные модули и целевые версии

**Файл: tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@core/*": ["src/core/*"],
      "@shared/*": ["src/shared/*"],
      "@features/*": ["src/features/*"],
      "@layouts/*": ["src/layouts/*"],
      "@pages/*": ["src/pages/*"],
      "@i18n/*": ["src/i18n/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Задача 1.4: Установка основных зависимостей

- [ ] Установить React Router: `pnpm add react-router-dom`
- [ ] Установить Ant Design: `pnpm add antd`
- [ ] Установить Zustand: `pnpm add zustand`
- [ ] Установить react-i18next и i18next: `pnpm add react-i18next i18next i18next-browser-languagedetector`
- [ ] Установить TanStack Query: `pnpm add @tanstack/react-query`
- [ ] Установить React Hook Form: `pnpm add react-hook-form`
- [ ] Установить DevDependencies: `pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom`

### Задача 1.5: Настройка Vitest

- [ ] Создать `vitest.config.ts`
- [ ] Настроить тестовое окружение
- [ ] Добавить конфигурацию для React Testing Library
- [ ] Создать файл инициализации тестов

**Файл: vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
});
```

---

## Фаза 2: Настройка инструментов и инфраструктуры

### Задача 2.1: Настройка API клиента

- [ ] Создать файл `core/api/client.ts` с HTTP клиентом (использовать fetch API)
- [ ] Настроить базовый URL для DummyJSON API
- [ ] Реализовать методы GET, POST, PUT, DELETE
- [ ] Добавить обработку ошибок

**Файл: core/api/client.ts**

```typescript
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseUrl = "https://dummyjson.com";

  async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      return {
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data.message,
        status: response.status,
      };
    } catch (error) {
      return {
        error: "Network error",
        status: 0,
      };
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
```

### Задача 2.2: Конфигурация TanStack Query

- [ ] Создать провайдер QueryClient в главном компоненте приложения
- [ ] Установить параметры по умолчанию для запросов
- [ ] Настроить обработку ошибок

**Файл: core/config/queryClient.ts**

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      gcTime: 1000 * 60 * 10, // 10 минут
      retry: 1,
    },
  },
});
```

### Задача 2.3: Конфигурация Zustand

- [ ] Создать типы для хранилища приложения
- [ ] Создать главное хранилище для состояния приложения
- [ ] Добавить методы для работы с состоянием

**Файл: core/store/appStore.ts**

```typescript
import { create } from "zustand";

interface AppStore {
  theme: "light" | "dark";
  language: string;
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: "light",
  language: "ru",
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
```

### Задача 2.4: Настройка i18next

- [ ] Создать конфиг для i18next
- [ ] Добавить локали (ru, en)
- [ ] Интегрировать с React компонентами через useTranslation хук

**Файл: i18n/config.ts**

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import ruCommon from "./locales/ru/common.json";

const resources = {
  en: { common: enCommon },
  ru: { common: ruCommon },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
```

### Задача 2.5: Создание хуков для работы с API

- [ ] Создать хук для получения данных с TanStack Query
- [ ] Создать хук для создания/обновления данных
- [ ] Создать хук для удаления данных
- [ ] Добавить обработку ошибок и loading состояний

**Файл: shared/hooks/useApi.ts**

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@core/api/client";

export const useFetch = <T>(endpoint: string) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => apiClient.get<T>(endpoint),
  });
};

export const useCreate = <T>(endpoint: string) => {
  return useMutation({
    mutationFn: (data: unknown) => apiClient.post<T>(endpoint, data),
  });
};

export const useUpdate = <T>(endpoint: string) => {
  return useMutation({
    mutationFn: (data: unknown) => apiClient.put<T>(endpoint, data),
  });
};

export const useDelete = (endpoint: string) => {
  return useMutation({
    mutationFn: () => apiClient.delete(endpoint),
  });
};
```

### Задача 2.6: Создание глобальных типов

- [ ] Создать базовые типы для приложения
- [ ] Типы для пагинации, фильтрации
- [ ] Типы для состояния запросов

**Файл: shared/types/common.ts**

```typescript
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  skip: number;
}

export interface FilterParams {
  [key: string]: string | number | boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ListResponse<T> {
  total: number;
  skip: number;
  limit: number;
  items: T[];
}
```

### Задача 2.7: Создание утилит валидации

- [ ] Создать функции валидации email, телефона, пароля
- [ ] Создать функции для форматирования данных
- [ ] Добавить хелперы для работы со строками и числами

**Файл: shared/utils/validators.ts**

```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};
```

---

## Фаза 3: Создание лейаутов и базовых компонентов

### Задача 3.1: Создание главного лейаута

- [ ] Создать компонент MainLayout с сайдбаром и хедером
- [ ] Добавить навигацию через React Router
- [ ] Реализовать переключение темы
- [ ] Добавить переключатель языка

**Файл: layouts/MainLayout.tsx**

```typescript
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { useAppStore } from '@core/store/appStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const { Content } = Layout

export const MainLayout: React.FC = () => {
  const theme = useAppStore((s) => s.theme)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
```

### Задача 3.2: Создание лейаута для авторизации

- [ ] Создать компонент AuthLayout
- [ ] Стилизовать форму авторизации
- [ ] Добавить фоновое изображение или градиент

### Задача 3.3: Создание компонента Header

- [ ] Компонент с логотипом и названием приложения
- [ ] Добавить переключатель языка
- [ ] Добавить переключатель темы
- [ ] Добавить профиль пользователя

### Задача 3.4: Создание компонента Sidebar

- [ ] Навигационное меню с разделами
- [ ] Коллапсируемые секции
- [ ] Активные состояния для текущей страницы
- [ ] Иконки для каждого пункта меню

---

## Фаза 4: Реализация фич - Продукты (Products)

### Задача 4.1: Создание типов для продуктов

- [ ] Определить интерфейс Product
- [ ] Создать интерфейс для формы создания/редактирования
- [ ] Типы для фильтрации и сортировки

**Файл: features/products/types.ts**

```typescript
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount?: number;
  rating?: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail?: string;
  images?: string[];
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
```

### Задача 4.2: Создание API слоя для продуктов

- [ ] Функция для получения списка продуктов
- [ ] Функция для получения одного продукта
- [ ] Функция для создания продукта
- [ ] Функция для обновления продукта
- [ ] Функция для удаления продукта

**Файл: features/products/api/productApi.ts**

```typescript
import { apiClient } from "@core/api/client";
import { Product, ProductFormData } from "../types";

export const productApi = {
  getAll: () => apiClient.get<{ products: Product[] }>("/products"),
  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),
  create: (data: ProductFormData) =>
    apiClient.post<Product>("/products/add", data),
  update: (id: number, data: ProductFormData) =>
    apiClient.put<Product>(`/products/${id}`, data),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
  search: (query: string) =>
    apiClient.get<{ products: Product[] }>(`/products/search?q=${query}`),
};
```

### Задача 4.3: Создание хуков для работы с продуктами

- [ ] Хук для получения списка продуктов
- [ ] Хук для получения одного продукта
- [ ] Хук для создания продукта
- [ ] Хук для обновления продукта
- [ ] Хук для удаления продукта

**Файл: features/products/hooks/useProducts.ts**

```typescript
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productApi.getAll();
      return response.data?.products || [];
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await productApi.getById(id);
      return response.data;
    },
  });
};
```

### Задача 4.4: Создание Zustand стора для фильтров продуктов

- [ ] Состояние для фильтров
- [ ] Состояние для сортировки
- [ ] Состояние для пагинации

**Файл: features/products/store/productStore.ts**

```typescript
import { create } from "zustand";
import { ProductFilters } from "../types";

interface ProductStore {
  filters: ProductFilters;
  sortBy: "price" | "rating" | "name";
  currentPage: number;
  pageSize: number;
  setFilters: (filters: ProductFilters) => void;
  setSortBy: (sort: "price" | "rating" | "name") => void;
  setCurrentPage: (page: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  filters: {},
  sortBy: "price",
  currentPage: 1,
  pageSize: 10,
  setFilters: (filters) => set({ filters }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
```

### Задача 4.5: Создание компонентов для списка продуктов

- [ ] Компонент ProductList (таблица или карточки)
- [ ] Компонент ProductCard (для отображения одного продукта)
- [ ] Компонент ProductFilters (фильтры и поиск)
- [ ] Компонент ProductPagination

**Файл: features/products/components/ProductList.tsx**

```typescript
import React from 'react'
import { Table, Empty, Spin } from 'antd'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../types'

export const ProductList: React.FC = () => {
  const { data, isLoading, error } = useProducts()

  if (isLoading) return <Spin />
  if (error) return <div>Error loading products</div>
  if (!data || data.length === 0) return <Empty />

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ]

  return <Table columns={columns} dataSource={data} rowKey="id" />
}
```

### Задача 4.6: Создание страницы со списком продуктов

- [ ] Интеграция фильтров, поиска, пагинации
- [ ] Кнопка добавления нового продукта
- [ ] Кнопки редактирования и удаления

**Файл: features/products/pages/ProductsPage.tsx**

```typescript
import React from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ProductList from '../components/ProductList'
import ProductFilters from '../components/ProductFilters'

export const ProductsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <ProductFilters />
        <Button type="primary" icon={<PlusOutlined />}>
          {t('products.add')}
        </Button>
      </Space>
      <ProductList />
    </div>
  )
}
```

### Задача 4.7: Создание модальной формы для создания/редактирования продукта

- [ ] Модальное окно для формы
- [ ] Компонент формы с React Hook Form
- [ ] Валидация полей
- [ ] Отправка данных на сервер

**Файл: features/products/components/ProductForm.tsx**

```typescript
import React from 'react'
import { Modal, Button, Space } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ProductFormData } from '../types'

interface ProductFormProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => void
  initialData?: ProductFormData
}

export const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { control, handleSubmit } = useForm<ProductFormData>({
    defaultValues: initialData,
  })
  const { t } = useTranslation()

  return (
    <Modal
      title={t('products.form.title')}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          {t('common.cancel')}
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
          {t('common.submit')}
        </Button>,
      ]}
    >
      {/* Форма с React Hook Form */}
    </Modal>
  )
}
```

---

## Фаза 5: Реализация фич - Пользователи (Users)

### Задача 5.1: Создание типов для пользователей

- [ ] Интерфейс User
- [ ] Типы для формы создания/редактирования
- [ ] Типы для фильтров

**Файл: features/users/types.ts**

```typescript
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "admin" | "user" | "moderator";
  avatar?: string;
  status: "active" | "inactive" | "blocked";
  createdAt: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "admin" | "user" | "moderator";
}

export interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
}
```

### Задача 5.2: Создание API слоя для пользователей

- [ ] Функция для получения списка пользователей
- [ ] Функция для получения одного пользователя
- [ ] Функция для создания пользователя
- [ ] Функция для обновления пользователя
- [ ] Функция для удаления пользователя

**Файл: features/users/api/userApi.ts**

```typescript
import { apiClient } from "@core/api/client";
import { User, UserFormData } from "../types";

export const userApi = {
  getAll: () => apiClient.get<{ users: User[] }>("/users"),
  getById: (id: number) => apiClient.get<User>(`/users/${id}`),
  create: (data: UserFormData) => apiClient.post<User>("/users/add", data),
  update: (id: number, data: UserFormData) =>
    apiClient.put<User>(`/users/${id}`, data),
  delete: (id: number) => apiClient.delete(`/users/${id}`),
  search: (query: string) =>
    apiClient.get<{ users: User[] }>(`/users/search?q=${query}`),
};
```

### Задача 5.3: Создание хуков для работы с пользователями

- [ ] Аналогично как для продуктов

### Задача 5.4: Создание Zustand стора для пользователей

- [ ] Состояние для фильтров
- [ ] Состояние для выбранного пользователя

### Задача 5.5: Создание компонентов для списка пользователей

- [ ] UserList, UserCard, UserFilters, UserPagination

### Задача 5.6: Создание страницы со списком пользователей

- [ ] Интеграция всех компонентов

### Задача 5.7: Создание модальной формы для создания/редактирования пользователя

- [ ] Валидация email и других полей
- [ ] Выбор роли и статуса

---

## Фаза 6: Реализация фич - Даш-борд (Dashboard)

### Задача 6.1: Создание страницы Dashboard

- [ ] Статистика по продуктам и пользователям
- [ ] Графики и диаграммы (используя Ant Design Charts)
- [ ] Последние активности

**Файл: features/dashboard/pages/DashboardPage.tsx**

```typescript
import React from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useProducts } from '@features/products/hooks/useProducts'
import { useUsers } from '@features/users/hooks/useUsers'

export const DashboardPage: React.FC = () => {
  const { data: products } = useProducts()
  const { data: users } = useUsers()

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={products?.length || 0}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={users?.length || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
```

---

## Фаза 7: Тестирование

### Задача 7.1: Создание unit тестов для хуков

- [ ] Тесты для useProducts, useUsers
- [ ] Тесты для Zustand сторов
- [ ] Мокирование API запросов

**Файл: tests/unit/hooks/useProducts.test.ts**

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "@features/products/hooks/useProducts";

vi.mock("@features/products/api/productApi");

describe("useProducts", () => {
  it("should fetch products", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

### Задача 7.2: Создание компонент-тестов

- [ ] Тесты для компонентов ProductList, UserList
- [ ] Тесты для формы создания/редактирования
- [ ] Тесты для фильтров

### Задача 7.3: Создание интеграционных тестов

- [ ] Тесты полного цикла CRUD операций
- [ ] Тесты навигации между страницами

---

## Фаза 8: Локализация

### Задача 8.1: Создание файлов локализации для русского языка

- [ ] common.json (общие фразы)
- [ ] products.json (текст продуктов)
- [ ] users.json (текст пользователей)
- [ ] errors.json (ошибки)

**Файл: i18n/locales/ru/common.json**

```json
{
  "common": {
    "cancel": "Отмена",
    "submit": "Отправить",
    "save": "Сохранить",
    "delete": "Удалить",
    "edit": "Редактировать",
    "add": "Добавить"
  },
  "nav": {
    "dashboard": "Дашборд",
    "products": "Продукты",
    "users": "Пользователи"
  }
}
```

### Задача 8.2: Создание файлов локализации для английского языка

- [ ] Аналогично русскому

### Задача 8.3: Интеграция i18next в компоненты

- [ ] Использование useTranslation хука
- [ ] Динамическая смена языка

---

## Фаза 9: Финальная конфигурация и оптимизация

### Задача 9.1: Создание файла .env

- [ ] BASE_URL для API
- [ ] Другие переменные окружения

**Файл: .env.example**

```
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_NAME=Admin Panel
```

### Задача 9.2: Создание роутов приложения

- [ ] Конфигурация React Router
- [ ] Защита приватных маршрутов
- [ ] Обработка 404 страницы

**Файл: src/routes.tsx**

```typescript
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@layouts/MainLayout'
import { DashboardPage } from '@features/dashboard/pages/DashboardPage'
import { ProductsPage } from '@features/products/pages/ProductsPage'
import { UsersPage } from '@features/users/pages/UsersPage'
import NotFoundPage from '@pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
```

### Задача 9.3: Создание главного компонента App

- [ ] Интеграция QueryClientProvider
- [ ] Интеграция i18next
- [ ] Интеграция Router

**Файл: src/App.tsx**

```typescript
import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@core/config/queryClient'
import { router } from './routes'
import '@i18n/config'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
```

### Задача 9.4: Создание главного файла входа

- [ ] Подготовка index.html
- [ ] Подготовка main.tsx

**Файл: src/main.tsx**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Задача 9.5: Оптимизация производительности

- [ ] Code splitting для роутов
- [ ] Lazy loading компонентов
- [ ] Оптимизация размера бандла
- [ ] Кэширование запросов

### Задача 9.6: Создание README с инструкциями

- [ ] Инструкция установки
- [ ] Инструкция запуска
- [ ] Описание структуры проекта
- [ ] Инструкция по добавлению новых фич

---

## Рекомендуемые публичные API для CRUD операций

### DummyJSON (РЕКОМЕНДУЕТСЯ) [1]

- **Эндпоинты:**
  - GET `/products` - получить все продукты
  - GET `/products/{id}` - получить продукт по ID
  - POST `/products/add` - создать продукт
  - PUT `/products/{id}` - обновить продукт
  - DELETE `/products/{id}` - удалить продукт
  - GET `/users` - получить всех пользователей
  - Поддержка пагинации через `limit` и `skip`

- **Преимущества:** 160+ млн запросов в месяц, реалистичные данные, полная поддержка CRUD, пагинация и фильтрация

### JSONPlaceholder [2]

- **Эндпоинты:** /posts, /users, /comments
- **Ограничения:** Нет постоянного хранилища (данные не сохраняются)
- **Идеально для:** Быстрого прототипирования и обучения

### Fake Store API [3]

- **Эндпоинты:** Фокус на e-commerce с продуктами и категориями
- **Идеально для:** Если нужны товары и категории

### Reqres [4]

- **Эндпоинты:** Поддержка JWT авторизации
- **Идеально для:** Если нужна работа с аутентификацией

---

## Примечания

1. **Начните с Фазы 1-2** - это займет 1-2 часа и даст вам рабочий проект
2. **Фазы 3-5** - реализация основных фич (4-6 часов)
3. **Фазы 6-9** - финализация, тестирование и оптимизация (3-4 часов)
4. **Используйте pnpm** вместо npm для лучшей производительности
5. **Регулярно коммитьте** изменения в git
6. **Документируйте компоненты** через JSDoc комментарии
7. **Следуйте принципу single responsibility** для компонентов
8. **Кэшируйте запросы** через TanStack Query для оптимизации
9. **Тестируйте каждую фичу** перед переходом к следующей
10. **Разделяйте логику** на API, hooks, store и компоненты

---

## Полезные команды

```bash
# Установка зависимостей
pnpm install

# Запуск в режиме разработки
pnpm dev

# Сборка проекта
pnpm build

# Просмотр бандла
pnpm preview

# Запуск тестов
pnpm test

# Просмотр UI тестов
pnpm test:ui

# Линтинг (если настроен ESLint)
pnpm lint

# Форматирование (если настроен Prettier)
pnpm format
```

---

## Чек-лист для начала

- [ ] Создан проект с помощью Vite
- [ ] Установлены все зависимости
- [ ] Настроена конфигурация TypeScript
- [ ] Настроена конфигурация Vite с path aliases
- [ ] Создана структура папок
- [ ] Настроен API клиент с fetch
- [ ] Настроен TanStack Query с провайдером
- [ ] Создано Zustand хранилище
- [ ] Настроена i18next локализация
- [ ] Созданы основные лейауты
- [ ] Настроена React Router навигация
- [ ] Готово к реализации фич!
