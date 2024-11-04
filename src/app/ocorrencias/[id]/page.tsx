import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Ocorrência",
  description: "Listagem da ocorrência",
};

export default function OccurrencePage() {
  return (
    <main className="min-h-dvh h-full bg-dark-secondary flex flex-col gap-20 items-center justify-center">
      Ocorrência
    </main>
  );
}
