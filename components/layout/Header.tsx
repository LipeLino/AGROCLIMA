"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AuthModals } from "@/components/auth/AuthModals";
import Image from "next/image";

export function Header() {
  const isVisible = useScrollHeader();
  const router = useRouter();
  const { loginTrigger, registerTrigger, modals } = AuthModals();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-300 transform",
          "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_8px_32px_-4px_rgba(0,0,0,0.1)]",
          "border-b border-gray-100",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
              {/* UEMG logo */}
              <div className="relative w-40 h-16">
                <Image
                  src="\uemg-logo.png"
                  alt="Logo UEMG"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* FAPEMIG logo */}
              <div className="relative w-32 h-12">
                <Image
                  src="\fapemig-logo.png"
                  alt="Logo FAPEMIG"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-[#003366] hover:text-[#004080]"
                onClick={registerTrigger}
              >
                Cadastrar
              </Button>
              <Button 
                className="bg-[#003366] hover:bg-[#004080]"
                onClick={loginTrigger}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>
      {modals}
    </>
  );
}