import type { Metadata } from "next";
import { Rethink_Sans} from 'next/font/google'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
const inter = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
})
import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider"


export const metadata: Metadata = {
  title: "DiproXuls",
  description: "Beyond School Management",
  icons:  "/vercel.svg" 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Toaster position="top-center" reverseOrder={false}/>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
