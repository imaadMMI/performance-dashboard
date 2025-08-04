import type { Metadata } from "next";
import localFont from "next/font/local";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
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
  title: "OES",
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
        className={`${quicksand.variable} ${strangewaysRegular.variable} ${strangewaysBold.variable} ${quicksand.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
