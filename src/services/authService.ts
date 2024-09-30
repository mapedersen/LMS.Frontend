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
  console.log("Response is: ", response);
  return response.json();
};

// Function to refresh access token using refresh token
export const refreshAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("ref method values", accessToken, refreshToken);

  const response = await fetch("https://localhost:7243/api/authentication/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  });

  console.log("Refresh token response: ", response);

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  } else {
    console.error("Failed to refresh token", response);
    // Optionally handle log out or redirect to login
  }
};
