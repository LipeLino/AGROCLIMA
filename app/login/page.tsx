"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleLogin = (email: string, password: string) => {
    if (email === "admin" && password === "admin") {
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} error={error} />
    </AuthLayout>
  );
}