"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  Divider,
} from "@nextui-org/react";

import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { TitleSection } from "@/components/utils/titleSection";

function SkeletonInfoItem() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="rounded-full w-10 h-10" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-20 rounded-lg" />
        <Skeleton className="h-3 w-24 rounded-lg" />
      </div>
    </div>
  );
}
export function AccountPageLoading() {
  return (
    <Container>
      <Section>
        <TitleSection description="Información Personal" title="Mi Cuenta" />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-3 md:col-span-1 pb-4">
            <CardHeader className="flex-col items-start px-4 pt-4">
              <Skeleton className="rounded-full w-20 h-20" />
              <Skeleton className="h-3 w-3/5 rounded-lg mt-2" />
              <Skeleton className="h-3 w-2/5 rounded-lg mt-2" />
              <div className="flex flex-wrap gap-2 mt-2">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
            </CardHeader>
            <Divider className="my-4" />
            <CardBody className="px-4 py-0">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-3 w-2/5 rounded-lg" />
                  <Skeleton className="h-2 w-full rounded-lg mt-2" />
                  <Skeleton className="h-3 w-1/5 rounded-lg mt-1" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-3 md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-2/5 rounded-lg" />
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, index) => (
                  <SkeletonInfoItem key={index} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
