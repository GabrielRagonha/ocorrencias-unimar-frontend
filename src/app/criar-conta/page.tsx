import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Criar conta",
  description: "Faça sua ocorrência",
};

export default function RegisterPage() {
  return (
    <main className="min-h-dvh h-full bg-auth-banner bg-cover bg-no-repeat bg-center pt-32">
      <RegisterForm />
    </main>
  );
}
