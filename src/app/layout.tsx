import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "Cubbon Jams - Where Music Meets Community",
  description:
    "Join Bangalore's vibrant music community. Open jam sessions, live music events, and community gatherings at Cubbon Park. From the park, to your heart.",
  keywords: [
    "Cubbon Jams",
    "Bangalore music",
    "jam sessions",
    "live music",
    "Cubbon Park",
    "music community",
    "open mic",
    "acoustic music",
  ],
  authors: [{ name: "Cubbon Jams" }],
  openGraph: {
    title: "Cubbon Jams - Where Music Meets Community",
    description:
      "Join Bangalore's vibrant music community. Open jam sessions, live music events, and community gatherings.",
    url: "https://cubbonjams.com",
    siteName: "Cubbon Jams",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubbon Jams - Where Music Meets Community",
    description:
      "Join Bangalore's vibrant music community. Open jam sessions, live music events.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-white dark:bg-secondary-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
