"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isUserAuthenticated = await isAuthenticated();
      if (!isUserAuthenticated) redirect("/sign-in");
    };
    checkAuth();
  }, []);

  return (
    <div
      className="min-h-screen w-full relative text-gray-800"
      style={{
        backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
      `,
      }}
    >
      <div className="root-layout relative z-10">
        <nav className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-secondary transition-colors cursor-pointer"
              aria-label="Back to Home"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m25 32-10-12 10-12" />
              </svg>
            </button>
          </div>

          <span className="text-sm text-foreground font-medium">
            AI-powered Interview Assistant
          </span>
        </nav>

        {children}
      </div>
    </div>
  );
};

export default Layout;
