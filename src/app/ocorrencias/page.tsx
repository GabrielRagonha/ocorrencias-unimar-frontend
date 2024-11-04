import AllOccurrences from "@/components/AllOccurences";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Ocorrências",
  description: "Listagem de ocorrências",
};

export default function OccurrencesPage() {
  return (
    <main className="min-h-dvh h-full bg-dark-secondary flex flex-col gap-20 items-center justify-center">
      <AllOccurrences />
    </main>
  );
}
