import FullOccurence from "@/components/FullOccurence";
import ResponseForm from "@/components/ResponseForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Ocorrência",
  description: "Listagem da ocorrência",
};

export default function OccurrencePage() {
  return (
    <main className="min-h-dvh h-full bg-dark-secondary flex flex-col gap-8 items-center justify-center py-8">
      <FullOccurence />
      <ResponseForm />
    </main>
  );
}
