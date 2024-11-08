import { NextResponse } from "next/server";
import { apiClient } from "@/lib/clients";
import { getCookie } from "@/hooks/useCookie";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const token = getCookie("ocorrencias_token");

    const response = await apiClient.get(`/ocorrencias/${id}`, {
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
