import React from "react";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
};

export default Providers;
