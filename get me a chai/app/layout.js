
import CinematicCursor from "@/components/CinematicCursor" 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen top-0 z-[-2] w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]">
            <CinematicCursor />
            {children}
          </div>
          <Footer />
        </ SessionWrapper>
      </body>
    </html>
  )
}
