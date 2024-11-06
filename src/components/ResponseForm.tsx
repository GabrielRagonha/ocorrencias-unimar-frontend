"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ResponseFormValues } from "@/lib/interfaces";

export default function ResponseForm() {
  const { register, handleSubmit } = useForm<ResponseFormValues>();
  const { id } = useParams<{ id: string }>();

  const onSubmit = async (data: ResponseFormValues) => {
    try {
      const response = await fetch("/api/ocurrences/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id }),
      });

      const { errors, message } = await response.json();

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

      showToast("success", <p>{message}</p>, { autoClose: 1000 });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      showToast(
        "error",
        <p>{error.message || "Ocorreu um erro ao responder a ocorrência!"}</p>
      );
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[71rem] max-w-full flex flex-col justify-center items-center rounded-[2rem] bg-dark-primary p-8 gap-3 shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)]"
      >
        <label
          htmlFor="text"
          className="flex flex-col gap-4 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem] w-full"
        >
          Resposta
          <textarea
            className="border-[0.0625rem] border-[#B6C9C8] h-[6.25rem] p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary"
            {...register("text")}
            id="text"
            aria-label="Campo de resposta"
          />
        </label>

        <button
          type="submit"
          aria-label="Responder ocorrência"
          className="w-full py-4 bg-[#0D0D0D] rounded-lg font-inter font-bold text-[1.125rem]/[1.5rem] text-white -tracking-[0.0112rem]"
        >
          Responder
        </button>
      </form>
    </section>
  );
}
