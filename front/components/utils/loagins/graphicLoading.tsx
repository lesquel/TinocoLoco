import { Skeleton } from "@nextui-org/react";

export const GraphicLoading = () => {
    return (
      <div className="flex space-x-4 justify-center items-end h-40">
        <div className="w-12 bg-gray-300 rounded-md">
          <Skeleton  className="h-full w-12" />
        </div>
        <div className="w-12 bg-gray-300 rounded-md">
          <Skeleton  className="h-full w-12" />
        </div>
        <div className="w-12 bg-gray-300 rounded-md">
          <Skeleton  className="h-full w-12" />
        </div>
      </div>
    );
  };