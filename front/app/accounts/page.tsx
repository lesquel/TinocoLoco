'use client'

import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip, Divider } from "@nextui-org/react"
import { IUUser } from '@/interfaces/IUser'
import { getTokenFromCookie } from '@/features/auth/utils/getUserInfo';

export default function Page() {
  const user = getTokenFromCookie()?.user;

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader className="flex gap-3">
        <Avatar isBordered radius="full" size="lg" src="/avatar.jpg" />
        <div className="flex flex-col">
          <p className="text-md font-bold">{user?.full_name || `${user?.first_name} ${user?.last_name}`.trim() || user?.username}</p>
          <p className="text-small text-default-500">@{user?.username}</p>
          <Chip size="sm" color="primary" variant="flat">{user?.role || 'No role'}</Chip>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-default-500">ID:</p>
            <p>{user?.id}</p>
          </div>
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
        </div>
      </CardBody>
      <Divider/>
      
    </Card>
  )
}


