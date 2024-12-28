"use client";
import { useState, useEffect, useCallback } from "react";

export function useApiRequest<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    apiFunction()
      .then((response) => {
        setData(response);
        setError(null);
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch };
}
