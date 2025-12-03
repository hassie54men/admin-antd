export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  image: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}
