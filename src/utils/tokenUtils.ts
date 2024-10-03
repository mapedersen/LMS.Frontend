import { jwtDecode } from "jwt-decode";

export const checkIfTokenExpired = (accessToken: string) => {
  if (!accessToken) return true; // Token doesn't exist, treat as expired

  const decodedToken: Record<string, any> = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
