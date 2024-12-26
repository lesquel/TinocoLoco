"use client";
import User from "@/public/images/user.png";
import React from "react";
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
export default function Page() {
  const user = getTokenFromCookie()?.user;
  console.log(user);
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
                  {user?.role}
                </Chip>
                <div className="flex flex-row gap-2">
                  {!user?.email_verified ? (
                    <ModalVerifyEmail />
                  ) : (
                    <Chip size="sm" color="primary" variant="flat">
                      Email verificado
                    </Chip>
                  )}
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
                    <Chip size="sm" color="danger" variant="flat">
                      Perfil completo
                    </Chip>
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
            <div className="flex justify-between">
                <p className="text-default-500">Cedula:</p>
                <p>{user?.identity_card}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Email:</p>
                <p>{user?.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Nombre:</p>
                <p>{user?.first_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Apellido:</p>
                <p>{user?.last_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Sexo:</p>
                <p>{user?.sex}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Email Verificado:</p>
                <p>{user?.email_verified ? "Si" : "No"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Identidad:</p>
                <p>{user?.identity_card}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Nacionalidad:</p>
                <p>{user?.nacionality}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Fecha de Registro:</p>
                <p>{user?.date_joined}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-default-500">Estado:</p>
                <p>{user?.is_active ? "Activo" : "Inactivo"}</p>
              </div>
            </div>
          </CardBody>
          <Divider />
        </Card>
      </Section>
    </Container>
  );
}
