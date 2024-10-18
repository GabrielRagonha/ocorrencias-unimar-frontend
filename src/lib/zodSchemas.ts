import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z
      .string()
      .min(1, { message: "O endereço de email é obrigatório" })
      .email({ message: "Endereço de email inválido" }),
    studentRegister: z
      .string({ message: "O RA deve ser numérico" })
      .min(1, { message: "O RA é obrigatório" }),
    password: z
      .string()
      .min(8, { message: "A senha deve possuir no mínimo 8 dígitos" }),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Os termos devem ser aceitos" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O endereço de email é obrigatório" })
    .email({ message: "Endereço de email inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve possuir no mínimo 8 caracteres" }),
});
