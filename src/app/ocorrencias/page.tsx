import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Ocorrências",
  description: "Listagem de ocorrências",
};

export default function OccurrencesPage() {
  return (
    <main className="min-h-dvh h-full bg-dark-secondary">
      <p>LISTAGEM DE OCORRENCIAS</p>
    </main>
  );
}
