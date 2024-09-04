import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Login",
  description: "Faça sua ocorrência",
};

export default function LoginPage() {
  return (
    <main className="h-dvh pt-32">
      <LoginForm />
    </main>
  );
}
