import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';
import { AuthProvider } from "./Providers";
import Preloader from "@/components/Preloader";
import NextTopLoader from 'nextjs-toploader';

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Shield - Password Manager",
    template: "%s | Shield - Password Manager",
  },
  description: "Open source secure password manager.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.png',
        href: '/logo-dark.png',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.png',
        href: '/logo.png',
      },
    ],
  }
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
            <div vaul-drawer-wrapper="" className="bg-background">{children}</div>
            {/* {children} */}
          </ThemeProvider>
          <Toaster position="top-center" />
          <Preloader />
        </body>
      </html>
    </AuthProvider>
  );
}
