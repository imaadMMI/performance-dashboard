import type { Metadata } from "next";
import localFont from "next/font/local";
import { Quicksand, Montserrat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const strangewaysRegular = localFont({
  src: "../fonts/strangeways_regular_sample.otf",
  variable: "--font-strangeways",
});

const strangewaysBold = localFont({
  src: "../fonts/strangeways_bold_sample.otf",
  variable: "--font-strangeways-bold",
});

export const metadata: Metadata = {
  title: "Sentiment",
  description: "OES Sales Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${montserrat.variable} ${strangewaysRegular.variable} ${strangewaysBold.variable} ${quicksand.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
