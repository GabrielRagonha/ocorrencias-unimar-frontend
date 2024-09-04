import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Criar conta",
  description: "Faça sua ocorrência",
};

export default function RegisterPage() {
  return (
    <main className="h-dvh pt-32">
      <RegisterForm />
    </main>
  );
}
