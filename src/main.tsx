import { createRoot } from "react-dom/client";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.ts";

import { AuthProvider } from "./context/authContext.tsx";

import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
