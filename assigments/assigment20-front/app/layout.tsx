import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AppProvider } from "@/components/providers/AppProvider";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { AuthModal } from "@/components/AuthModal";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5173";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quibly — ცოდნა რეალურ დროში",
    template: "%s | Quibly",
  },
  description:
    "თანამედროვე quiz პლატფორმა 10 თემით, 100 კითხვით და live leaderboard-ით.",
  openGraph: {
    title: "Quibly — ცოდნა რეალურ დროში",
    description: "10 თემა, 100 კითხვა და live leaderboard ერთ სივრცეში.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quibly — ცოდნა რეალურ დროში",
    description: "10 თემა, 100 კითხვა და live leaderboard ერთ სივრცეში.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>
        <AppProvider>
          <div className="site-shell">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <AuthModal />
          <ToastViewport />
        </AppProvider>
      </body>
    </html>
  );
}
