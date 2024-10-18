import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/zodSchemas";
import { apiClient } from "@/lib/clients";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = RegisterSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          errors: parsedData.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { terms, confirmPassword, ...data } = parsedData.data;

    await apiClient.post(`/users`, { ...data, role: "student" });

    return NextResponse.json({ message: "Cadastro feito com sucesso!" });
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
