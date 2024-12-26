"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";

interface CustomToastProps {
  t: {
    visible: boolean;
    id: string;
  };
  verificationLink: string;
}

export const CustomEmailVerificationToast: React.FC<CustomToastProps> = ({
  t,
  verificationLink,
}) => {
  return (
    <Card className="flex items-center justify-between max-w-96 gap-3 ">
      <CardBody className="flex flex-row items-center">
        <IoMdClose className="h-10 w-10 text-red-500" />
        <p className="mt-1 text-sm text-gray-500">
          Click the link below to verify your email:
        </p>
        <Button
        as={Link}
        color="primary"
          href={verificationLink}
        >
          Verify Email
        </Button>
      </CardBody>
    </Card>
  );
};

export function InforVerificationToast() {
  useEffect(() => {
    const userInfo = getTokenFromCookie();
    if (!userInfo) {
      return;
    }
    if (!userInfo?.user?.email_verified) {
      toast.custom(
        (t) => (
          <CustomEmailVerificationToast
            t={t}
            verificationLink="/verify-email" // Replace with your actual verification link
          />
        ),
        {
          duration: 3000, // 50 seconds
          position: "bottom-right",
        }
      );
    }
  }, []);

  return null; // This component doesn't render anything
}
