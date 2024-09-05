import Providers from "@/components/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "../components/navigation/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robin Moreno Rinding Portfolio",
  description: "Portfolio for Robin Moreno Rinding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
