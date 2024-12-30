"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUsersMostRentals } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";

export function UserMostRentaslGraphic() {
  const fetchUsers = useCallback(
    () =>
      getUsersMostRentals({
        size: 5,
      }),
    []
  );
  const { data, error, isLoading } = useApiRequest(fetchUsers);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <GraphicLoading />;
  }

  if (!data || data.results.length === 0) {
    return (
      <div>
        <TitleSection title="Usuarios" description="Sexo" />
        No hay datos de usuarios
      </div>
    );
  }

  // Procesar datos para contar usuarios por sexo
  const userCounts = data.results.reduce(
    (acc, user) => {
      if (user.sex === "M") acc.male++;
      if (user.sex === "F") acc.female++;
      return acc;
    },
    { male: 0, female: 0 }
  );

  // Configuración del gráfico
  const option = {
    xAxis: {
      type: "category",
      data: ["Masculino", "Femenino"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: [
          {
            value: userCounts.male,
            itemStyle: {
              color: "#5470c6",
            },
          },
          {
            value: userCounts.female,
            itemStyle: {
              color: "#91cc75",
            },
          },
        ],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
        },
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
      <TitleSection title="Sexo" description="de los usuarios" />
      <ReactECharts option={option} className="w-full h-full" />
    </div>
  );
}