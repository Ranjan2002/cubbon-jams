import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { EventsProvider } from "@/lib/EventsContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import SiteAnnouncement from "@/components/ui/SiteAnnouncement";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
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
          <EventsProvider>
            <ToastProvider>
              <ScrollProgress />
              <SiteAnnouncement />
              <div className="flex min-h-screen flex-col bg-white dark:bg-secondary-900 transition-colors duration-300">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <BackToTop />
            </ToastProvider>
          </EventsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
