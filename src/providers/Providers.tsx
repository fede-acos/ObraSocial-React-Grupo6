import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>{children}</NextUIProvider>;
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Providers;
