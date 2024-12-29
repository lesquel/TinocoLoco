import { Spacer, Card } from "@nextui-org/react";

import { TitleSection } from "../titleSection";

export const CardLoadingBasic = () => (
  <Card className="w-[200px] space-y-5 p-4 rounded-xl">
    <div className="h-24 rounded-lg bg-default-300" />
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
    </div>
  </Card>
);

export function CardLoagin({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div>
      {title && description && (
        <TitleSection description={description} title={title} />
      )}
      <div className="flex justify-between w-full">
        <CardLoadingBasic />
        <Spacer x={4} />
        <CardLoadingBasic />
        <Spacer x={4} />
        <CardLoadingBasic />
        <Spacer x={4} />
        <CardLoadingBasic />
      </div>
    </div>
  );
}
