export interface ProviderProps {
  children: React.ReactNode;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  studentRegister: number;
  password: string;
  confirmPassword: string;
  terms: string;
}

export interface OcurrenceFormValues {
  description: string;
  isAnonymous: string;
}

export interface ResponseFormValues {
  text: string;
}
