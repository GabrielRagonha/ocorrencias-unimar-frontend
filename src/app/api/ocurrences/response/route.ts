import { NextResponse } from "next/server";
import { apiClient } from "@/lib/clients";
import { getCookie } from "@/hooks/useCookie";
import { ResponseSchema } from "@/lib/zodSchemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = ResponseSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          errors: parsedData.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const token = getCookie("ocorrencias_token");

    const { text: texto, id: ocorrenciaId } = parsedData.data;

    const response = await apiClient.post(
      `/respostas`,
      { texto, ocorrenciaId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      message: response.data.message || "Resposta enviada com sucesso!",
    });
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
