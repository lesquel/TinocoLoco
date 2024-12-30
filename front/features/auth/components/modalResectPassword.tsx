'use client'

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Chip,
  Input
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import { sendPasswordResetCode, resetPassword } from "@/features/auth/services/auth";
import { IUSendPasswordResetCode } from "@/interfaces/IUauth";
export function RestauerasePasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>({});

  const { execute: executeSendEmail, loading: loadingSendEmail } = useAsyncAction(sendPasswordResetCode);
  const { execute: executeResetPassword, loading: loadingResetPassword } = useAsyncAction(resetPassword);

  const sendVerificationEmail = () => {
    executeSendEmail({ email }, (response) => {
      if (response.errors) {
        toast.error("Error al enviar el código de verificación");
        return;
      }
      toast.success("Se ha enviado el correo de confirmación");
      setStep(2);
    });
  };

  const verifyCodeAndResetPassword = () => {
    const resetData: IUSendPasswordResetCode = {
      code,
      new_password: newPassword
    };

    executeResetPassword({ data: resetData }, (response) => {
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }
      toast.success("Contraseña actualizada correctamente");
      onOpenChange(false);
      window.location.reload();
    });
  };

  return (
    <>
      <div className="flex justify-center items-center gap-6">
        <Button variant="light" color="danger" onPress={onOpen}>
          recuperar contraseña
        </Button>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {step === 1 ? "Ingresa tu email" : "Verifica y resetea tu contraseña"}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 justify-center items-center">
                {step === 1 ? (
                  <Input
                    label="Email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <>
                    <Input
                      label="Código de verificación"
                      placeholder="Ingresa el código"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Input
                      label="Nueva contraseña"
                      placeholder="Ingresa tu nueva contraseña"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                {step === 1 ? (
                  <Button color="primary" onPress={sendVerificationEmail} isLoading={loadingSendEmail}>
                    Enviar código
                  </Button>
                ) : (
                  <Button color="primary" onPress={verifyCodeAndResetPassword} isLoading={loadingResetPassword}>
                    Verificar y resetear
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

