import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import ThemeToggle from "@/components/ThemeToggle";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");

  return (
    <div className="auth-layout">
      <div className="absolute top-4 right-4">
        <ThemeToggle variant="icon" size="md" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
