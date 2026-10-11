import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kevin Putrayudha Naserwan | Software Engineer & AI Researcher",
  description: "Portfolio of Kevin Putrayudha Naserwan - Application Developer at PT Bukit Asam (Persero) Tbk, Distributed Systems Engineer, and Applied AI Researcher.",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/94282343?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#090d16] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
