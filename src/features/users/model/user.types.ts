import {
  type PaginatedResponse,
  Resources,
} from "../../../shared/types/api.ts";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
}

export type UsersListResponse = PaginatedResponse<Resources.USERS, User>;
