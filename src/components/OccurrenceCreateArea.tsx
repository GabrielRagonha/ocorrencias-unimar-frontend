"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { OcurrenceFormValues } from "@/lib/interfaces";

export default function OccurrenceCreateArea() {
  const { register, handleSubmit } = useForm<OcurrenceFormValues>();

  const router = useRouter();

  const onSubmit = async (data: OcurrenceFormValues) => {
    try {
      const response = await fetch("/api/ocurrences/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

      showToast("success", <p>{message}</p>);
    } catch (error: any) {
      showToast(
        "error",
        <p>
          {error.message || "Ocorreu um erro ao tentar criar uma ocorrência!"}
        </p>
      );
    } finally {
      router.push("/ocorrencias");
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[34rem] max-w-full flex flex-col justify-center items-center rounded-[2rem] bg-dark-primary p-8 gap-3 shadow-[0_10px_15px_0px_rgba(0,0,0,0.15)]"
      >
        <label
          htmlFor="description"
          className="flex flex-col gap-4 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem] w-full"
        >
          Descrição da ocorrência
          <textarea
            className="border-[0.0625rem] border-[#B6C9C8] h-[12.5rem] p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary"
            {...register("description")}
            id="description"
            aria-label="Campo de descrição"
          />
        </label>

        <label
          htmlFor="isAnonymous"
          className="flex gap-3 items-center self-start font-poppins font-medium text-sm text-white"
        >
          <input
            type="checkbox"
            id="isAnonymous"
            aria-label="Campo de alterar anonimato"
            className="appearance-none min-w-4 min-h-4 border-[0.0625rem] border-[#757575] rounded bg-white checked:bg-dark-secondary checked:border-dark-secondary transition-all ease-in-out duration-300"
            {...register("isAnonymous")}
          />
          Deseja enviar com anonimato?
        </label>

        <button
          type="submit"
          aria-label="Enviar ocorrência"
          className="w-full py-4 bg-[#0D0D0D] rounded-lg font-inter font-bold text-[1.125rem]/[1.5rem] text-white -tracking-[0.0112rem]"
        >
          Enviar ocorrência
        </button>
      </form>
    </section>
  );
}
