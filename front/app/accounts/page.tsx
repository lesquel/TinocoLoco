"use client";
import User from "@/public/images/user.png";
import React, { useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
  Divider,
  Button,
} from "@nextui-org/react";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { CiEdit } from "react-icons/ci";
import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { TitleSection } from "@/components/utils/titleSection";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ModalVerifyEmail } from "@/components/utils/modal/modalVerifyEmail";
import { getUser } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import { saveToken } from "@/features/auth/utils/saveUserInfo";
export default function Page() {
  const infoUsuerToke = getTokenFromCookie();
  const fetchUser = useCallback(() => getUser(infoUsuerToke?.user?.id), []);
  const { data, error, isLoading } = useApiRequest(fetchUser);
  console.log(
    "dataefojbwedfguofówefówowfe´wogeifgweofgewgfówgwfeo´jwefgwogweu:",
    infoUsuerToke
  );
  if (error) {
    return <div>Error al obtener la información del usuario</div>;
  }
  if (!data) {
    return <div>Cargando...</div>;
  }
  saveToken({
    token: infoUsuerToke?.token,
    user: data,
  });
  const user = data;

  const userInfo = [
    { label: "Cedula", value: user?.identity_card },
    { label: "Email", value: user?.email },
    { label: "Nombre", value: user?.first_name },
    { label: "Apellido", value: user?.last_name },
    { label: "Sexo", value: user?.sex },
    { label: "Email Verificado", value: user?.email_verified ? "Si" : "No" },
    { label: "Nacionalidad", value: user?.nationality },
    {
      label: "Fecha de Registro",
      value: new Date(user?.date_joined).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { label: "Estado", value: user?.is_active ? "Activo" : "Inactivo" },
  ];

  return (
    <Container>
      <Section>
        <TitleSection title="Mi Cuenta" description="Editar Datos" />
        <Card className="max-w-[600px] mx-auto">
          <CardHeader className="flex gap-3">
            <Avatar isBordered radius="full" size="lg" src={User.src} />
            <div className="flex flex-row justify-between flex-1">
              <div className="flex-1">
                <p className="text-md font-bold">
                  {user?.full_name || user?.username || "Usuario"}
                </p>
                <p className="text-small text-default-500">@{user?.username}</p>
                <Chip size="sm" color="primary" variant="flat">
                  {user?.role || "customer"}
                </Chip>
                <div className="flex flex-row gap-2">
                  {!user?.email_verified ? (
                    <ModalVerifyEmail />
                  ) : (
                    <Chip size="sm" color="primary" variant="flat">
                      Email verificado
                    </Chip>
                  )}
                  {user?.email_verified && (
                    <>
                      {!user?.has_completed_profile ? (
                        <div>
                          <Chip size="sm" color="danger" variant="flat">
                            Perfil incompleto
                          </Chip>
                          <Button
                            href={siteConfig.navMenuItems.edit.href}
                            as={Link}
                            color="primary"
                          >
                            Resolver
                          </Button>
                        </div>
                      ) : (
                        <Chip size="sm" color="primary" variant="flat">
                          Perfil completo
                        </Chip>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Link href={siteConfig.navMenuItems.edit.href}>
                <CiEdit />
              </Link>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-3">
              {userInfo.map(({ label, value }, index) => (
                <div className="flex justify-between" key={index}>
                  <p className="text-default-500">{label}:</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </CardBody>
          <Divider />
        </Card>
      </Section>
    </Container>
  );
}
