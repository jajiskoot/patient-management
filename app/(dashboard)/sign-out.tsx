"use client";

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


import { app } from "@/firebase";
import { Button } from "@/components/ui/button";

export function SignOut() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch(("/api/logout"));
    router.push("/login");
  }

  return (
    <Button onClick={handleLogout}>Sign Out</Button>
  )
}