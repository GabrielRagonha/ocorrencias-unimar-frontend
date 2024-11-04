"use client";

import { showToast } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllOccurrences() {
  const [occurrences, setOccurrences] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchOccurrences = async () => {
    try {
      const response = await fetch("/api/ocurrences", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { errors, message, data } = await response.json();

      if (!response.ok) {
        if (errors && Array.isArray(errors)) {
          showToast(
            "error",
            <>
              <p className="mb-2">Por favor, corrija os seguintes erros:</p>
              {errors.map((error: string, index: number) => (
                <p key={index} className="mb-1">
                  - {error}
                </p>
              ))}
            </>
          );
        } else if (message) {
          showToast("error", <p>{message}</p>);
        } else {
          showToast("error", <p>Ocorreu um erro desconhecido!</p>);
        }
        return;
      }

      setOccurrences(data || []);
    } catch (error: any) {
      showToast(
        "error",
        <p>
          {error.message || "Ocorreu um erro ao tentar criar uma ocorrência!"}
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const nameAbbreviation = (name: string) => {
    const words = name.trim().split(" ");

    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return words[0][0].toUpperCase();
  };

  useEffect(() => {
    fetchOccurrences();
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center gap-8">
      <p className="text-white font-inter font-medium text-3xl">
        Suas ocorrências
      </p>

      <div
        className={`flex flex-col gap-3 overflow-y-auto ${
          occurrences.length === 0 ? "justify-center" : "justify-start"
        } items-center  w-[calc(100%-4rem)] max-w-[75rem] h-[31.25rem] max-h-dvh bg-dark-primary rounded-[2rem] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)] py-8 px-16 [&::-webkit-scrollbar]:w-0`}
      >
        {loading ? (
          <p className="text-white font-inter font-medium text-2xl">
            Carregando...
          </p>
        ) : occurrences.length > 0 ? (
          occurrences.map((occurrence: any) => (
            <Link
              href={`/ocorrencias/${occurrence.id}`}
              aria-label={`Ocorrência ${occurrence.id}`}
              key={occurrence.id}
              className="w-full flex justify-between items-center gap-2 p-8 rounded-2xl bg-dark-secondary border-[0.0625rem] border-[#FFFFFF20] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)"
            >
              <div className="flex flex-1 items-center gap-4">
                <p className="flex items-center justify-center bg-white text-dark-tertiary font-poppins font-bold text-[1rem] leading-normal h-12 w-12 rounded-full border-[0.0625rem] border-[#00000030] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)]">
                  {nameAbbreviation(
                    occurrence.isAnonima ? "Anônimo" : occurrence.user.name
                  )}
                </p>

                <div className="flex flex-col items-center gap-1 w-[7.6875rem] max-w-[7.6875rem]">
                  <span className="line-clamp-1 font-poppins font-bold text-[0.75rem] leading-normal text-white">
                    {occurrence.isAnonima ? "Anônimo" : occurrence.user.name}
                  </span>

                  <span className="line-clamp-1 font-poppins font-normal text-[0.75rem] leading-normal text-white">
                    {occurrence.isAnonima
                      ? "???????"
                      : occurrence.user.studentRegister}
                  </span>
                </div>
              </div>

              <p className="flex-[3] line-clamp-2 font-poppins font-normal text-[1rem] leading-normal text-white">
                {occurrence.descricao}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-white font-inter font-medium text-2xl">
            Nenhuma ocorrência encontrada!
          </p>
        )}
      </div>
    </section>
  );
}
