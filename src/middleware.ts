import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ocorrencias_token");
  const pathname = request.nextUrl.pathname;

  // Se o token estiver presente e a rota for '/' ou '/criar-conta', redireciona para '/ocorrencias'
  if (token) {
    if (pathname === "/" || pathname === "/criar-conta") {
      return NextResponse.redirect(new URL("/ocorrencias", request.url));
    }
  }

  // Caso não haja token, o usuário não poderá acessar nenhuma página além do login e cadastro
  if (!token) {
    if (pathname !== "/" && pathname !== "/criar-conta") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Se não houver necessidade de redirecionamento, continua para a próxima rota
  return NextResponse.next();
}
