import { Spacer, Card } from "@nextui-org/react";
import { TitleSection } from "../titleSection";

export const CustomCard = () => (
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
      {title && description && <TitleSection title={title} description={description} />}
      <div className="flex justify-between w-full">
        <CustomCard />
        <Spacer x={4} />
        <CustomCard />
        <Spacer x={4} />
        <CustomCard />
        <Spacer x={4} />
        <CustomCard />
      </div>
    </div>
  );
}
