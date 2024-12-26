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

export  function  ModalVerifyEmail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sendVerificationEmail = () => {
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
              <ModalBody>
                <Input
                  endContent={
                    <TbMailBitcoin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Codigo de verificación"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" >
                  Volver a enviar
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Verificar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
