import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Physics Simulations",
  description: "Made by Uttam Jangir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-around py-4 md:pb-0 bg-slate-300">
          <div>
            <h2 className="font-semibold text-lg md:text-xl">
              Projectile SImulation
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <FaGithub className="size-4" />
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
