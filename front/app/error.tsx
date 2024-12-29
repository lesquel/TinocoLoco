"use client";

import { Card } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
  
    console.error(error);
  }, [error]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Error</h1>
      <p className="text-default-500">
        Se ha producido un error. Por favor, inténtelo nuevamente.
      </p>
    </Card>
  );
}
