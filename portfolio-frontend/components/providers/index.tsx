import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </TooltipProvider>
  );
};

export default Providers;