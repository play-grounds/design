import { Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
});

export const metadata = {
  title: "Batch Merch",
  description: "New designs daily.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ecdf",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${script.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
