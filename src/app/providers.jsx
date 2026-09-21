"use client";

import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Toast.Provider />
      {children}
    </ThemeProvider>
  );
}
