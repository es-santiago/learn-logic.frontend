import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google'
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Learn Logic",
  description: "Exercite-se",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${poppins.variable}`}>
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
