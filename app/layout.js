import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getDocuments } from "@/lib/doc";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocuCraft - A documentation website by Protocol",
  description: "A documentation website by Protocol",
};

export default async function RootLayout({ children }) {
  const allDocuments = await getDocuments(); // Assuming this is an async function

  return (
    <html lang="en">
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
        <div className="h-full lg:ml-72 xl:ml-80">
          <Suspense fallback={<Loading />}>
            <Header docs={allDocuments} />
            <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
              <main className="flex-auto py-16">
                <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
                  <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"></div>
                  </div>
                </div>
                {children}
              </main>
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
