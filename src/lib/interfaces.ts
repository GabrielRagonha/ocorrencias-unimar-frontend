export interface ProviderProps {
  children: React.ReactNode;
}

export interface LoginFormValues {
  user: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  ra: number;
  user: string;
  password: string;
  confirmPassword: string;
  terms: string;
}
