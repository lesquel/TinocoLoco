'use client'

import React, { useCallback, useState } from "react"
import { useApiRequest } from "@/hooks/useApiRequest"
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo"
import { getUser } from "@/features/auth/services/auth"
import { saveToken } from "@/features/auth/utils/saveUserInfo"
import { Container } from "@/components/sections/layout/container"
import { Section } from "@/components/sections/layout/section"
import { TitleSection } from "@/components/utils/titleSection"
import { ModalVerifyEmail } from "@/components/utils/modal/modalVerifyEmail"
import FormEditUser from "@/features/auth/components/formEditUser"
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
  Button,
  Divider,
  Tooltip,
  User,
  Progress,
} from "@nextui-org/react"
import { CiEdit } from "react-icons/ci"
import { FaUserCircle, FaEnvelope, FaIdCard, FaCalendar, FaGlobe, FaVenusMars } from "react-icons/fa"
import UserImagen from "@/public/images/user.png"
import { AccountPageLoading } from "@/components/utils/loagins/accountsLoading"

export default function AccountPage() {
  const infoUserToken = getTokenFromCookie()
  const fetchUser = useCallback(() => getUser(infoUserToken?.user?.id), [infoUserToken?.user?.id])
  const { data: user, error, isLoading } = useApiRequest(fetchUser)
  const [isEditMode, setIsEditMode] = useState(false)

  if (error) return <div>Error al obtener la información del usuario</div>
  if (isLoading) return <AccountPageLoading />

  saveToken({
    token: infoUserToken?.token,
    user: user,
  })

  const profileCompleteness = calculateProfileCompleteness(user)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <Container>
      <Section>
        <TitleSection title="Mi Cuenta" description="Información Personal" />
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-3 md:col-span-1 pb-4">
            <CardHeader className="flex-col items-start px-4 pt-4">
              <Avatar
                isBordered
                radius="full"
                size="lg"
                src={user.avatar || UserImagen.src}
                className="w-20 h-20 text-large"
              />
              <h4 className="text-large font-bold mt-2">{user.full_name || user.username}</h4>
              <p className="text-small text-default-500">@{user.username}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Chip size="sm" color="primary" variant="flat">
                  {user.role || "customer"}
                </Chip>
                {user.email_verified ? (
                  <Chip size="sm" color="success" variant="flat">
                    Email verificado
                  </Chip>
                ) : (
                  <ModalVerifyEmail />
                )}
              </div>
            </CardHeader>
            <Divider className="my-4" />
            <CardBody className="px-4 py-0">
              <div className="space-y-4">
                <div>
                  <p className="text-small font-bold">Completado del perfil</p>
                  <Progress
                    aria-label="Profile completeness"
                    size="sm"
                    value={profileCompleteness}
                    color="primary"
                    className="max-w-md mt-2"
                  />
                  <p className="text-tiny text-default-500 mt-1">{profileCompleteness}% completo</p>
                </div>
                <Button
                  color="primary"
                  endContent={<CiEdit />}
                  fullWidth
                  onClick={toggleEditMode}
                >
                  {isEditMode ? "Ver Info" : "Editar Perfil"}
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-3 md:col-span-2">
            <CardHeader>
              <h4 className="text-large font-bold">
                {isEditMode ? "Editar Información" : "Información Detallada"}
              </h4>
            </CardHeader>
            <Divider />
            <CardBody>
              {isEditMode ? (
                <FormEditUser />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UserInfoItem icon={<FaIdCard />} label="Cédula" value={user.identity_card} />
                  <UserInfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
                  <UserInfoItem icon={<FaUserCircle />} label="Nombre" value={user.first_name} />
                  <UserInfoItem icon={<FaUserCircle />} label="Apellido" value={user.last_name} />
                  <UserInfoItem icon={<FaVenusMars />} label="Sexo" value={user.sex} />
                  <UserInfoItem icon={<FaGlobe />} label="Nacionalidad" value={user.nationality} />
                  <UserInfoItem
                    icon={<FaCalendar />}
                    label="Fecha de Registro"
                    value={new Date(user.date_joined).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <UserInfoItem
                    icon={<FaUserCircle />}
                    label="Estado"
                    value={user.is_active ? "Activo" : "Inactivo"}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </Section>
    </Container>
  )
}

function UserInfoItem({ icon, label, value }) {
  return (
    <Tooltip content={value}>
      <User
        name={label}
        description={value}
        avatarProps={{
          icon: icon,
        }}
      />
    </Tooltip>
  )
}

function calculateProfileCompleteness(user) {
  const fields = ['identity_card', 'email', 'first_name', 'last_name', 'sex', 'nationality']
  const completedFields = fields.filter(field => user[field])
  return Math.round((completedFields.length / fields.length) * 100)
}

