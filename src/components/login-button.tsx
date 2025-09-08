'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return session ? (
    <Button
      onClick={() => router.push("/dashboard")}
      className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 transition-colors duration-200"
      aria-label="Minha Conta"
    >
      <User size={18} /> Minha Conta
    </Button>
  ) : (
    <Button
      onClick={() => router.push("/auth")}
      className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 transition-colors duration-200"
      aria-label="Entrar"
    >
      <LogIn size={18} /> Entrar
    </Button>
  );
}
