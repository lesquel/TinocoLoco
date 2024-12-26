"use client";
import User from "@/public/images/user.png";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Divider,
} from "@nextui-org/react";
import { IUUser } from "@/interfaces/IUser";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { CiEdit } from "react-icons/ci";
export default function Page() {
  const user = getTokenFromCookie()?.user;

  return (
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
            {user?.email_verified || (
              <div>
                <Chip size="sm" color="danger" variant="flat">
                  Email no verificado
                </Chip>
                <button>Verificar</button>
              </div>
            )}
            {user?.has_completed_profile || (
              <div>
                <Chip size="sm" color="danger" variant="flat">
                  Perfil incompleto
                </Chip>
                <button>Completar</button>
              </div>
            )}
          </div>
          <div className="">
            <CiEdit />
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-default-500">Email:</p>
            <p>{user?.email}</p>
          </div>
          {user?.first_name && (
            <div className="flex justify-between">
              <p className="text-default-500">Nombre:</p>
              <p>{user?.first_name}</p>
            </div>
          )}
          {user?.last_name && (
            <div className="flex justify-between">
              <p className="text-default-500">Apellido:</p>
              <p>{user?.last_name}</p>
            </div>
          )}
          {user?.sex && (
            <div className="flex justify-between">
              <p className="text-default-500">Sexo:</p>
              <p>{user?.sex}</p>
            </div>
          )}
          {user?.email_verified && (
            <div className="flex justify-between">
              <p className="text-default-500">Email Verificado:</p>
              <p>{user?.email_verified ? "Si" : "No"}</p>
            </div>
          )}
          {user?.identity_card && (
            <div className="flex justify-between">
              <p className="text-default-500">Identidad:</p>
              <p>{user?.identity_card}</p>
            </div>
          )}
          {user?.nacionality && (
            <div className="flex justify-between">
              <p className="text-default-500">Nacionalidad:</p>
              <p>{user?.nacionality}</p>
            </div>
          )}
          {user?.date_joined && (
            <div className="flex justify-between">
              <p className="text-default-500">Fecha de Registro:</p>
              <p>{user?.date_joined}</p>
            </div>
          )}
          {user?.is_active && (
            <div className="flex justify-between">
              <p className="text-default-500">Estado:</p>
              <p>{user?.is_active ? "Activo" : "Inactivo"}</p>
            </div>
          )}
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
}
