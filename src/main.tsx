import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
