import { jwtDecode } from "jwt-decode";
import { IUser } from "../types/user";
import { refreshAccessToken } from "./authService";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const checkIfTokenExpired = (accessToken: string) => {
  if (!accessToken) return true;

  const decodedToken: Record<string, any> = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const fetchAllUsers = async (accessToken: string): Promise<IUser[]> => {
  if (checkIfTokenExpired(accessToken)) {
    const { accessToken: newAccessToken } = await refreshAccessToken();
    accessToken = newAccessToken || accessToken;
  }

  const url = `${baseUrl}/users`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
