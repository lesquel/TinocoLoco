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
        size: 5, // Obtenemos solo los 5 usuarios con más rentas
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

  // Extraer el nombre de usuario y el número de rentas
  const userData = data.results.map((user) => ({
    name: user.username || "Desconocido", // Nombre del usuario
    reservations: user.reservation_count || 0, // Número de rentas
  }));

  // Configuración del gráfico de barras
  const option = {
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c} rentas", // Muestra el nombre del usuario y las rentas
    },
    xAxis: {
      type: "category",
      data: userData.map((user) => user.name), // Los nombres de usuario en el eje X
      axisLabel: {
        color: "#fff", // Color de las etiquetas en el eje X
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff", // Color de las etiquetas en el eje Y
      },
    },
    series: [
      {
        name: "Rentas",
        type: "bar",
        data: userData.map((user) => user.reservations), // Número de rentas para cada usuario
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 1,
          borderType: "solid",
          borderColor: "#73c0de",
          shadowColor: "#5470c6",
          shadowBlur: 3,
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
