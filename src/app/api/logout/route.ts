import { deleteCookie } from "@/hooks/useCookie";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    deleteCookie("ocorrencias_token");

    return NextResponse.json({ message: "Deslogado com sucesso!" });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || error.message || "Ocorreu um erro!",
      },
      { status: error.response?.data?.statusCode || 500 }
    );
  }
}
