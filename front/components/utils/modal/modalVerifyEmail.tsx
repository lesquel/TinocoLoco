import { sendVerificationEmail, verificationCodeEmail } from "@/features/auth/services/auth";
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

export  function  ModalVerifyEmail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { error, execute, loading } = useAsyncAction(sendVerificationEmail);

  const { error: verificationCodeError, execute: executeVerificationCode, loading: loadingVerificationCode } = useAsyncAction<IUcodeEmail>(verificationCodeEmail);

  const sendVerificationEmailAction = () => {
    execute({}, (response) => {
      console.log("response:", response);
    });
  };

  const verificationCodeEmailConfig: FormConfig = {
    verification_code: {
      type: "text",
      label: "Codigo de verificación",
      required: true,
      validation: {
        required: "El codigo de verificación es obligatorio",
        min : 6
      },
    },
  };

  const onsubmit = (data: any) => {
    executeVerificationCode(data, (response) => {
      
      window.location.reload();
    });
  };

  return (
    <>
      <Chip size="sm" color="danger" variant="flat">
        Email no verificado
      </Chip>
      <Button onPress={onOpen} color="primary">Resolver</Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="flex flex-col gap-2 justify-center items-center">
                <DynamicForm formConfig={verificationCodeEmailConfig} onSubmit={onsubmit} />
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
