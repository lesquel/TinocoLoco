"use client";

import { useState } from "react";
import {
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import Link from "next/link";

import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { siteConfig } from "@/config/site";

interface UserInfo {
  user: {
    email_verified: boolean;
    has_completed_profile: boolean;
  };
}

export const ConditionalRentalButton = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });

  const userInfo = getTokenFromCookie();

  const handleClick = () => {
    if (!userInfo) {
      redirect(siteConfig.navMenuItems.login.href);

      return;
    }

    if (!userInfo.user.email_verified) {
      setModalContent({
        title: "Verificación de correo requerida",
        message: "Por favor, verifica tu correo electrónico antes de alquilar.",
      });
      setIsModalOpen(true);

      return;
    }

    if (!userInfo.user.has_completed_profile) {
      setModalContent({
        title: "Perfil incompleto",
        message: "Por favor, completa tu perfil antes de alquilar.",
      });
      setIsModalOpen(true);

      return;
    }

    redirect(siteConfig.navMenuItems.rentals.add.href + `/${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonContent = (
    <Button className="flex-1" color="danger" size="lg" onClick={handleClick}>
      Alquilar ahora
    </Button>
  );

  return (
    <>
      {userInfo &&
      (!userInfo.user.email_verified ||
        !userInfo.user.has_completed_profile) ? (
        <Tooltip
          content={
            !userInfo.user.email_verified
              ? "Verifica tu correo electrónico"
              : "Completa tu perfil"
          }
        >
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalBody>
            <p>{modalContent.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={closeModal}>
              Close
            </Button>
            <Button
              as={Link}
              color="primary"
              href={siteConfig.navMenuItems.account.href}
              onPress={closeModal}
            >
              Resolver
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
