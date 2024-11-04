import OccurrenceCreateArea from "@/components/OccurrenceCreateArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocorrências UNIMAR - Criação de ocorrências",
  description: "Criação de ocorrências",
};

export default function OccurrenceCreatePage() {
  return (
    <main className="min-h-dvh h-full bg-dark-secondary flex items-center justify-center">
      <OccurrenceCreateArea />
    </main>
  );
}
