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

import DynamicForm from "@/components/utils/form/dynamicForm";

import {
  sendConfirmationEmail,
  confirmRental,
} from "@/features/rentals/services/rentals";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { FormConfig } from "@/interfaces/IUform";
import { IUcodeEmail } from "@/interfaces/IUser";
import { useErrorsForm } from "@/services/utils/useErrosForm";

export function ModalVerifyEmailRental({ rentalId }: { rentalId: number }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { error, execute, loading } = useAsyncAction(sendConfirmationEmail);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
  );

  const {
    error: verificationCodeError,
    execute: executeVerificationCode,
    loading: loadingVerificationCode,
  } = useAsyncAction<any>(confirmRental);

  const sendVerificationEmailAction = (data: any) => {
    execute({idRental : rentalId}, (response) => {
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
    confirmation_code: {
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
    executeVerificationCode({data}, (response) => {
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
      <div className="flex justify-center items-center gap-6">
        <Chip color="danger" size="sm" variant="flat">
          Renta no confirmada
        </Chip>
        <Button color="danger" onPress={onOpen}>
          Resolver
        </Button>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confimacion de la renta
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
                  cerrar
                </Button>
                <Button color="primary" onPress={sendVerificationEmailAction}>
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
