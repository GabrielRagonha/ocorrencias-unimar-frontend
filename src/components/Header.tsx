"use client";

// import { deleteCookie } from "@/hooks/useCookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const logout = async () => {
    // deleteCookie("ocorrencias_token");
    router.refresh();
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-dark-primary">
      <figure className="relative aspect-[200/44] max-w-[12.5rem] w-full">
        <Image alt="Logo UNIMAR" src={"/logos/logo_white.svg"} fill />
      </figure>

      <ul className="flex items-center gap-6">
        <li className="flex items-center">
          <Link
            className="font-inter text-white text-base font-normal -tracking=[0.01rem]"
            href="/ocorrencias"
            aria-label="Listagem de ocorrências"
          >
            Ocorrências
          </Link>
        </li>

        <li className="flex items-center">
          <Link
            className="font-inter text-white text-base font-normal -tracking=[0.01rem]"
            href="/ocorrencias/criar"
            aria-label="Criação de ocorrências"
          >
            Criar ocorrência
          </Link>
        </li>

        <li className="flex items-center">
          <button
            className="py-3 px-4 bg-[#AA0B0B] rounded-[0.625rem] cursor-pointer font-inter text-white text-base font-medium -tracking=[0.02rem]"
            type="button"
            onClick={() => logout()}
            aria-label="Sair"
          >
            Sair
          </button>
        </li>
      </ul>
    </header>
  );
}
