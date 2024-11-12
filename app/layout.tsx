"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { MainAppLayout } from "@/modules/main-app/layout/MainAppLayout";
import { Earth, Settings2Icon, SlidersHorizontal } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [title, setTitle] = useState("KLHK-APP");

  useEffect(() => {
    const generateTitle = () => {
      if (pathname === "/") return "KLHK-APP";
      return "KLHK-APP";
    };
    setTitle(generateTitle());
  }, [pathname]);

  const metadata: Metadata = {
    title,
  };

  return (
    <ClerkProvider>
      <html
        lang="en"
        className="dark"
        style={{
          colorScheme: "dark",
        }}
      >
        <head>
          <title>{title}</title>
        </head>
        <body className={inter.className}>
          <Toaster />
          <RootProviders>
          <MainAppLayout
              navItems={[
                {
                  path: "/map",
                  title: "Map",
                  icon: Earth,
                },
                {
                  path: "/systemdynamic",
                  title: "System Dynamic",
                  icon: SlidersHorizontal,
                },
              ]}
            >
              {children}
            </MainAppLayout>
          </RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
