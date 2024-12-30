"use client";

import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUsersMostRentals } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";

export function UserMostRentalsGraphic() {
  const fetchUsers = useCallback(
    () =>
      getUsersMostRentals({
        size: 5,
      }),
    []
  );

  const { data, error, isLoading } = useApiRequest(fetchUsers);

  if (error) {
    return <div className="text-red-600">Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <GraphicLoading />;
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div>
        <TitleSection title="Usuarios" description="Con más rentas" />
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  // Extraer nombres y número de rentas
  const userData = data.results.map((user) => ({
    name: user.username || "Desconocido",
    value: user.identity_card || 0, // Cambiar "date_joined" por el campo correcto
  }));

  // Configuración del gráfico tipo "pie"
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} rentas ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Rentas",
        type: "pie",
        radius: "50%",
        data: userData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto">
      <TitleSection title="Usuarios" description="Con más rentas" />
      <ReactECharts option={option} className="w-full h-96" />
    </div>
  );
}