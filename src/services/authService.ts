import { AuthCredentials, AuthResponse } from "../types/auth";

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { username, password } = credentials;

  const response = await fetch("https://localhost:7243/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
