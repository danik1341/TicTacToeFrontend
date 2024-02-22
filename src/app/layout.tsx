import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/store/Provider";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe VS a Bot created in NestJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-200 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
