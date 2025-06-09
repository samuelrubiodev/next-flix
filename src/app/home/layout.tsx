import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "../globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Home | NextFlix",
  description: "A web application for viewing movie information with the api of TMDB",
  authors: [
    {
      name: "Samuel Rubio",
      url: "https://github.com/samuelrubiodev"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className={`${firaSans.className} antialiased`}>
        {children}
      </main>
    </>
  );
}
