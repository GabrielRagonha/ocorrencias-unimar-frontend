import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Login",
  description: "Faça sua ocorrência",
};

export default function LoginPage() {
  return (
    <main className="h-dvh bg-auth-banner bg-cover bg-no-repeat bg-center pt-32">
      <LoginForm />
    </main>
  );
}
