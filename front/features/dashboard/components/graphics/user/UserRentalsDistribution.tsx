"use client";

import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUsersMostRentals } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";

export function UserRentalsDistribution() {
  const fetchUsers = useCallback(
    () =>
      getUsersMostRentals({
        size: 50, // Aumentamos el tamaño de la consulta para tener más datos
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

  // Extraer el número de rentas de cada usuario
  const reservationCounts = data.results.map((user) => user.reservation_count || 0);

  // Definir rangos para el histograma
  const bins = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50]; // Definimos los rangos de rentas
  const counts = bins.map((bin, index) => {
    if (index === 0) return reservationCounts.filter((count) => count <= bin).length;
    return reservationCounts.filter((count) => count > bins[index - 1] && count <= bin).length;
  });

  // Configuración del gráfico de histograma
  const option = {
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c} usuarios",
    },
    xAxis: {
      type: "category",
      data: bins.map((bin, index) => (index === 0 ? `<=${bin}` : `>${bins[index - 1]}-${bin}`)), // Rango de rentas
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "Usuarios",
        type: "bar",
        data: counts, // Frecuencia de cada rango
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
      <TitleSection title="Usuarios" description="Distribución de rentas" />
      <ReactECharts option={option} className="w-full h-96" />
    </div>
  );
}
