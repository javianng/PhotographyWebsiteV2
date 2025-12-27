import { type Metadata } from "next";
import { Footer } from "~/components/layout/footer";
import { Navbar } from "~/components/layout/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { METADATA } from "~/lib/constants";
import "~/styles/globals.css";
import { Quattrocento_Sans } from "next/font/google";
import { Mulish } from "next/font/google";

export const metadata: Metadata = METADATA;

const quattrocentoSans = Quattrocento_Sans({
  subsets: ["latin"],
  variable: "--font-quattrocento-sans",
  weight: "400",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${quattrocentoSans.variable} ${mulish.variable} `}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-col or" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="shotbyj.av" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-center">
            <div className="max-w-7xl flex-col px-2 sm:px-10">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
