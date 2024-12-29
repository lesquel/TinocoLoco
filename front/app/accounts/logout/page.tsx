"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

import { logout } from "@/features/auth/utils/logout";
import { isLogin } from "@/features/auth/utils/isLogin";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      logout();
      window.location.href = "/";
    } else {
      router.push("/accounts/login");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardBody className="text-center">
          <h1 className="text-2xl font-bold mb-2">Se ha cerrado la sesión</h1>
          <p className="text-gray-600 mb-4">
            Gracias por usar nuestro servicio. ¡Esperamos verte pronto!
          </p>
        </CardBody>
        <CardFooter className="flex justify-center gap-4">
          <Button as={Link} color="primary" href="/" variant="flat">
            Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
