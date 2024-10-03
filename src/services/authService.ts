import { AuthCredentials, AuthResponse } from "../types/auth";

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { username, password } = credentials;

  const response = await fetch("http://localhost:5058/api/authentication/login", {
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

// Function to refresh access token using refresh token
export const refreshAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch("http://localhost:5058/api/authentication/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Updating local storage with new access and refreshtoken ", response);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } else {
    console.error("Failed to refresh token", response);
    return {};
    // Optionally handle log out or redirect to login
  }
};
