import { cookies } from "next/headers";

export const getCookie = (cookieName: string): string | null => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie ? cookie.value : null;
};

export const deleteCookie = (cookieName: string): void => {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
};

export default getCookie;
