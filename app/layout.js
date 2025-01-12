import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';
import { AuthProvider } from "./Providers";
import Preloader from "@/components/Preloader";
import NextTopLoader from 'nextjs-toploader';
import Header from "@/components/Header";
import Notif from "@/components/Notif";
import TokenProvider from "@/components/providers/TokenProvider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Shield",
    template: "%s | Shield",
  },
  description: "Open source secure password manager.",
  icons: {
    icon: ["/logo.png"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="hsl(var(--primary))"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
            {/* <div vaul-drawer-wrapper="" className="bg-background"> */}
            <TokenProvider>
              {children}
            </TokenProvider>
            {/* </div> */}
          </ThemeProvider>
          <Toaster position="top-center" />
          <Preloader />
        </body>
      </html>
    </AuthProvider>
  );
}
