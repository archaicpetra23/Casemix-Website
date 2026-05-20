// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Casemix RS — Sistem Informasi Pengelolaan Data Casemix Rumah Sakit",
  description:
    "Sistem informasi terintegrasi untuk pengelolaan data casemix, rekam medis, klaim BPJS, dan laporan rumah sakit.",
  keywords: "casemix, rumah sakit, BPJS, rekam medis, ICD-10, INA-CBGs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0EA5E9" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
