import React from "react";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
};

export default Providers;
