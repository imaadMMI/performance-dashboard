import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const strangewaysRegular = localFont({
  src: "../fonts/strangeways_regular_sample.otf",
  variable: "--font-strangeways",
});

const strangewaysBold = localFont({
  src: "../fonts/strangeways_bold_sample.otf",
  variable: "--font-strangeways-bold",
});

export const metadata: Metadata = {
  title: "National Bonds",
  description: "National Bonds Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${strangewaysRegular.variable} ${strangewaysBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
