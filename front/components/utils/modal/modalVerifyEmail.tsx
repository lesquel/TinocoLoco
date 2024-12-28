import {
  sendVerificationEmail,
  verificationCodeEmail,
} from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { TbMailBitcoin } from "react-icons/tb";
import DynamicForm from "../form/dynamicForm";
import { FormConfig } from "@/interfaces/IUform";
import { IUcodeEmail } from "@/interfaces/IUser";
import { useState } from "react";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import toast from "react-hot-toast";

export function ModalVerifyEmail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { error, execute, loading } = useAsyncAction(sendVerificationEmail);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
  );

  const {
    error: verificationCodeError,
    execute: executeVerificationCode,
    loading: loadingVerificationCode,
  } = useAsyncAction<IUcodeEmail>(verificationCodeEmail);

  const sendVerificationEmailAction = (data: any) => {
    execute({}, (response) => {
      if (response.errors){
        toast.error("Error al enviar el código de verificación", {
          style: {
            background: "#000000",
            color: "#FFEBE9",
          },
          iconTheme: {
            primary: "#FFEBE9",
            secondary: "#000000",
          }
        });
        return;
      }
      console.log("response:", response);
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
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", data);
    executeVerificationCode(data, (response) => {
      console.log("response:", response);
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }
      console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:", response);
      // window.location.reload();
    });
  };

  return (
    <>
      <Chip size="sm" color="danger" variant="flat">
        Email no verificado
      </Chip>
      <Button onPress={onOpen} color="primary">
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
                  formConfig={verificationCodeEmailConfig}
                  onSubmit={onsubmit}
                  externalErrors={externalErrors}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
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
