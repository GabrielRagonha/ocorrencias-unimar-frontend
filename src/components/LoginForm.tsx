"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/lib/utils";
import IconInvisible from "@material-design-icons/svg/filled/visibility.svg";
import IconVisible from "@material-design-icons/svg/filled/visibility_off.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LoginFormValues } from "@/lib/interfaces";
import Link from "next/link";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const [visiblePass, setVisiblePass] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("/api/login", {
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
      router.push("/ocorrencias");
    } catch (error: any) {
      showToast(
        "error",
        <p>{error.message || "Ocorreu um erro ao tentar logar!"}</p>
      );
    }
  };

  return (
    <section className="flex justify-center items-start h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-8 w-[calc(100%-4rem)] max-w-[25rem] p-8 rounded-[0.625rem] border-[0.0625rem] 
        border-white/20 bg-white/10 shadow-[0_4px_6px_0px_rgba(0,0,0,0.15)] backdrop-blur-[0.1875rem]"
      >
        <figure className="relative aspect-[200/44] max-w-[12.5rem] w-full">
          <Image alt="Logo UNIMAR" src={"/logos/logo_white.svg"} fill />
        </figure>

        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="email"
            className="flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            Email
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type="text"
              {...register("email")}
              id="email"
              aria-label="Campo de usuário"
            />
          </label>

          <label
            htmlFor="password"
            className="relative flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            Senha
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type={visiblePass ? "text" : "password"}
              {...register("password")}
              id="password"
              aria-label="Campo de senha"
            />
            {visiblePass ? (
              <IconVisible
                className="absolute max-w-6 max-h-6 fill-[#91A1A1] bottom-1 right-2 cursor-pointer"
                width={24}
                height={24}
                onClick={() => setVisiblePass(false)}
              />
            ) : (
              <IconInvisible
                className="absolute max-w-6 max-h-6 fill-[#91A1A1] bottom-1 right-2 cursor-pointer"
                width={24}
                height={24}
                onClick={() => setVisiblePass(true)}
              />
            )}
          </label>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button
            type="submit"
            aria-label="Entrar"
            className="w-full py-4 bg-dark-primary rounded-lg font-inter font-bold text-[1.125rem]/[1.5rem] text-white -tracking-[0.0112rem]"
          >
            Entrar
          </button>

          <span className="font-inter font-normal text-[0.875rem]/[1rem] text-dark-tertiary -tracking-[0.0088rem] text-end">
            Não é registrado?
            <Link
              href="/criar-conta"
              aria-label="Criar conta"
              className="font-bold ml-1"
            >
              Criar conta
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
}
