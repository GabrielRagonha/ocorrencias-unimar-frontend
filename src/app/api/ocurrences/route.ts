import { NextResponse } from "next/server";
import { apiClient } from "@/lib/clients";
import { getCookie } from "@/hooks/useCookie";
import { OccurrenceSchema } from "@/lib/zodSchemas";

export async function GET() {
  try {
    const token = getCookie("ocorrencias_token");

    const response = await apiClient.get(`/ocorrencias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      data: response.data,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = OccurrenceSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          errors: parsedData.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const token = getCookie("ocorrencias_token");

    const { description: descricao, isAnonymous: isAnonima } = parsedData.data;

    const response = await apiClient.post(
      `/ocorrencias`,
      { descricao, isAnonima },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      message: response.data.message || "Ocorrência feita com sucesso!",
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
