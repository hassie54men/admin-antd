export interface User {
  username: string;
  email: string;
  firstName: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
