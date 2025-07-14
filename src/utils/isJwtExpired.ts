import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number; // UNIX timestamp (만료 시각)
};

export const isExpired = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch {
    return true;
  }
};
