"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import ThemeToggle from "@/components/ThemeToggle";

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
    <div className="root-layout">
      <nav className="flex justify-between items-center w-full">
        {/* <Link href="/" className="flex items-center gap-2"> */}
        {/* <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} /> */}
        {/* <h2 className="text-primary-100">Key2Career</h2> */}
        {/* </Link> */}

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-full p-1 hover:bg-gray-900 transition-colors cursor-pointer"
            aria-label="Back to Home"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m25 32-10-12 10-12" />
            </svg>
          </button>

          <ThemeToggle variant="icon" size="md" />
        </div>

        <span className="text-sm text-light-100 font-medium">
          AI-powered Interview Assistant
        </span>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
