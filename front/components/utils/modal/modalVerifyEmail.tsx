import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

import DynamicForm from "../form/dynamicForm";

import {
  sendVerificationEmail,
  verificationCodeEmail,
} from "@/features/auth/services/auth";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { FormConfig } from "@/interfaces/IUform";
import { IUcodeEmail } from "@/interfaces/IUser";
import { useErrorsForm } from "@/services/utils/useErrosForm";

export function ModalVerifyEmail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { error, execute, loading } = useAsyncAction(sendVerificationEmail);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {},
  );

  const {
    error: verificationCodeError,
    execute: executeVerificationCode,
    loading: loadingVerificationCode,
  } = useAsyncAction<IUcodeEmail>(verificationCodeEmail);

  const sendVerificationEmailAction = (data: any) => {
    execute({}, (response) => {
      if (response.errors) {
        toast.error("Error al enviar el código de verificación", {
          style: {
            background: "#000000",
            color: "#FFEBE9",
          },
          iconTheme: {
            primary: "#FFEBE9",
            secondary: "#000000",
          },
        });
        return;
      }
      toast.success("Se ha enviado el correo de confirmación", {
        style: {
          background: "#000000",
          color: "#FFEBE9",
        },
        iconTheme: {
          primary: "#FFEBE9",
          secondary: "#000000",
        },
      });
    });
  };

  const verificationCodeEmailConfig: FormConfig = {
    code: {
      type: "text",
      label: "Codigo de verificación",
      required: true,
      validation: {
        required: "El codigo de verificación es obligatorio",
        min: 6,
      },
    },
  };

  const onsubmit = (data: any) => {
    executeVerificationCode(data, (response) => {
      console.log("response:", response);
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }
      window.location.reload();
    });
  };

  return (
    <>
      <Chip color="danger" size="sm" variant="flat">
        Email no verificado
      </Chip>
      <Button color="danger" onPress={onOpen}>
        Resolver
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Verifica tu correo
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2 justify-center items-center">
                <DynamicForm
                  externalErrors={externalErrors}
                  formConfig={verificationCodeEmailConfig}
                  onSubmit={onsubmit}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" variant="flat" onPress={sendVerificationEmailAction}>
                  Volver a enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
