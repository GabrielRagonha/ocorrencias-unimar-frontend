"use client";

import { fullBrazilianDate, nameAbbreviation, showToast } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FullOccurence() {
  const [occurrence, setOccurrence] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  const fetchOccurrence = async () => {
    try {
      const response = await fetch(`/api/ocurrences/byId?id=${id}`, {
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

      setOccurrence(data || []);
    } catch (error: any) {
      showToast(
        "error",
        <p>{error.message || "Ocorreu um erro ao listar a ocorrência!"}</p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOccurrence();
  }, []);

  return (
    <section className="w-full h-full flex justify-center items-start">
      <div
        className={`flex flex-col gap-8 overflow-y-auto items-center  w-[calc(100%-4rem)] max-w-[71rem] h-[34.375rem] max-h-dvh bg-dark-primary rounded-[2rem] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)] p-8 [&::-webkit-scrollbar]:w-0`}
      >
        {!loading && (
          <div className="flex items-center justify-center gap-3 w-full max-w-full">
            <span className="flex items-center justify-center bg-white text-dark-tertiary font-poppins font-bold text-[1rem] leading-normal h-12 w-12 rounded-full border-[0.0625rem] border-[#00000030] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)]">
              {nameAbbreviation(
                occurrence.isAnonima ? "Anônimo" : occurrence.userName
              )}
            </span>

            <span className="line-clamp-1 font-poppins font-bold text-[0.75rem] leading-normal text-white">
              {occurrence.isAnonima ? "Anônimo" : occurrence.userName}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          {loading ? (
            <p className="text-white font-inter font-medium text-2xl">
              Carregando...
            </p>
          ) : (
            <>
              <p className="bg-dark-secondary border-[0.0625rem] border-[#FFFFFF20] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)] p-8 w-full max-w-full rounded-2xl font-poppins font-normal text-[1rem] leading-normal text-white">
                {occurrence.descricao}
              </p>

              {occurrence.respostas.length > 0 &&
                occurrence.respostas.map(
                  (
                    { dataCriacao, texto, userId, userName }: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={`border-[0.0625rem] border-[#FFFFFF20] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)] p-8 w-full max-w-[50%] rounded-2xl font-poppins font-normal text-[1rem] leading-normal text-white flex flex-col gap-8 ${
                        userId !== occurrence.userId
                          ? "bg-[#000E2D]"
                          : "bg-dark-secondary self-end"
                      }`}
                    >
                      <p>{texto}</p>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 ">
                          <p className="flex items-center justify-center bg-white text-dark-tertiary font-poppins font-bold text-[0.75rem] leading-normal h-7 w-7 rounded-full border-[0.0625rem] border-[#00000030] shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)]">
                            {nameAbbreviation(
                              occurrence.isAnonima &&
                                userId === occurrence.userId
                                ? "Anônimo"
                                : userName
                            )}
                          </p>

                          <div className="flex flex-col gap-1 items-center">
                            <span className="line-clamp-1 font-poppins font-bold text-[0.75rem] leading-normal text-white">
                              {occurrence.isAnonima &&
                              userId === occurrence.userId
                                ? "Anônimo"
                                : userName}
                            </span>
                          </div>
                        </div>

                        <span className="font-poppins font-medium text-[0.75rem] leading-normal text-white">
                          {fullBrazilianDate(dataCriacao)}
                        </span>
                      </div>
                    </div>
                  )
                )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
