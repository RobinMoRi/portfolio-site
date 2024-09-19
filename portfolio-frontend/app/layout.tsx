import Providers from "@/components/providers";
import type { Metadata } from "next";
import NavBar from "../components/navigation/NavBar";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ChatFab from "./components/chat/ChatFab";
config.autoAddCss = false;

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
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <ChatFab />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
