import { Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
});

const url = "https://play-grounds.github.io/design/tshirts/";
const description = "Streetwear on the rack. New designs daily.";

export const metadata = {
  metadataBase: new URL(url),
  title: "Batch Merch",
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: "Batch Merch",
    title: "Batch Merch",
    description,
    images: [{ url: `${url}og.png`, width: 1200, height: 630, alt: "Ten tees, long sleeves and a hoodie hanging on a chrome clothing rack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batch Merch",
    description,
    images: [`${url}og.png`],
  },
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
