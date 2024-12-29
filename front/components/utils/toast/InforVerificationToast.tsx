"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { Button, Card, CardBody } from "@nextui-org/react";

import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { siteConfig } from "@/config/site";

interface CustomToastProps {
  t: {
    visible: boolean;
    id: string;
  };
  verificationLink: string;
  text: string;
}

const CustomToast: React.FC<CustomToastProps> = ({
  t,
  verificationLink,
  text,
}) => {
  return (
    <Card className="flex items-center justify-between max-w-96 gap-3">
      <CardBody className="flex flex-row items-center">
        <IoMdClose className="h-10 w-10 text-red-500" />
        <p className="mt-1 text-sm text-gray-500">{text}</p>
        <Button
          as={Link}
          className="text-sm py-1 px-2"
          color="primary"
          href={verificationLink}
        >
          Verificar
        </Button>
      </CardBody>
    </Card>
  );
};

export function InforVerificationToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const userInfo = getTokenFromCookie();

    if (!userInfo) return;

    if (!userInfo?.user?.email_verified) {
      toast.custom(
        (t) => (
          <CustomToast
            t={t}
            text="Por favor, verifica tu correo electrónico para poder continuar."
            verificationLink={siteConfig.navMenuItems.account.href}
          />
        ),
        {
          duration: 5000,
          position: "bottom-right",
        },
      );
    }

    if (!userInfo.user.has_completed_profile) {
      toast.custom(
        (t) => (
          <CustomToast
            t={t}
            text="Por favor, completa tu perfil para poder continuar."
            verificationLink={siteConfig.navMenuItems.account.href}
          />
        ),
        {
          duration: 5000,
          position: "bottom-right",
        },
      );
    }
  }, [mounted]);

  // No renderiza nada en el DOM directamente.
  return null;
}
