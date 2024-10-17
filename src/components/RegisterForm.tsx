"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/lib/utils";
import IconInvisible from "@material-design-icons/svg/filled/visibility.svg";
import IconVisible from "@material-design-icons/svg/filled/visibility_off.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RegisterFormValues } from "@/lib/interfaces";
import Link from "next/link";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch("/api/register", {
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
      router.push("/");
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
          <Image
            alt="Logo UNIMAR"
            src={"/logos/logo_white.svg"}
            fill
            priority
          />
        </figure>

        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="name"
            className="flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            Nome
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type="text"
              {...register("name")}
              id="name"
              aria-label="Campo de nome"
              autoComplete="off"
            />
          </label>

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
              aria-label="Campo de email"
              autoComplete="off"
            />
          </label>

          <label
            htmlFor="ra"
            className="flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            RA
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type="text"
              {...register("ra")}
              id="ra"
              aria-label="Campo de RA"
              autoComplete="on"
            />
          </label>

          <label
            htmlFor="user"
            className="flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            Usuário
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type="text"
              {...register("user")}
              id="user"
              aria-label="Campo de usuário"
              autoComplete="off"
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

          <label
            htmlFor="confirmPassword"
            className="relative flex flex-col gap-2 font-poppins font-bold text-[1rem]/[1rem] text-white tracking-[0.02rem]"
          >
            Confirmar senha
            <input
              className={`border-[0.0625rem] border-[#B6C9C8] h-8 p-1 rounded-lg font-normal text-sm text-dark-primary outline-dark-primary`}
              type={visibleConfirmPass ? "text" : "password"}
              {...register("confirmPassword")}
              id="confirmPassword"
              aria-label="Campo de confirmação de senha"
            />
            {visibleConfirmPass ? (
              <IconVisible
                className="absolute max-w-6 max-h-6 fill-[#91A1A1] bottom-1 right-2 cursor-pointer"
                width={24}
                height={24}
                onClick={() => setVisibleConfirmPass(false)}
              />
            ) : (
              <IconInvisible
                className="absolute max-w-6 max-h-6 fill-[#91A1A1] bottom-1 right-2 cursor-pointer"
                width={24}
                height={24}
                onClick={() => setVisibleConfirmPass(true)}
              />
            )}
          </label>

          <label htmlFor="terms" className="flex gap-3 items-center">
            <input
              type="checkbox"
              id="terms"
              aria-label="Campo de confirmar com termos e condições"
              className="appearance-none min-w-4 min-h-4 border-[0.0625rem] border-[#757575] rounded bg-white checked:bg-dark-primary checked:border-dark-primary transition-all ease-in-out duration-300"
              {...register("terms")}
            />
            <span className="font-inter font-normal text-[1rem]/[1.5rem] text-dark-primary tracking-[0.0094rem]">
              Concordo com os{" "}
              <Link
                href="#"
                aria-label="Termos e condições"
                target="_blank"
                className="font-bold text-dark-tertiary"
              >
                termos e condições
              </Link>
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button
            type="submit"
            aria-label="Cadastrar"
            className="w-full py-4 bg-dark-primary rounded-lg font-inter font-bold text-[1.125rem]/[1.5rem] text-white -tracking-[0.0112rem]"
          >
            Cadastrar
          </button>

          <span className="font-inter font-normal text-[0.875rem]/[1rem] text-dark-tertiary -tracking-[0.0088rem] text-end">
            Já possui conta?
            <Link href="/" aria-label="Entrar" className="font-bold ml-1">
              Entrar
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
}
