import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContactsProvider } from "@/contexts/ContactsContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nirbhaya - Women's Safety App",
  description: "A comprehensive women's safety app with emergency SOS, trusted contacts, and safety resources",
  keywords: "women safety, emergency, SOS, safety app, Nirbhaya",
  authors: [{ name: "Nirbhaya Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#e91e63",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ContactsProvider>
            {children}
          </ContactsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
