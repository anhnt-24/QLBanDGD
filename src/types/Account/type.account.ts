export interface Account {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  avartar: string;
  avartarUrl: string;
  role: string;
}

export interface AuthContextType {
  auth?: {
    id?: string;
    role?: string;
    name?: string;
  };
  setAuth: (auth?: AuthContextType["auth"]) => void;
}

export interface LoginResponse {
  token: string;
}

export interface GoogleAuthenRequest {
  ggToken: string;
  name: string;
  email: string;
  avatar: string;
}
