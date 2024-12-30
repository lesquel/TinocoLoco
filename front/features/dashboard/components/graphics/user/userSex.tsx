"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUsers } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { use, useCallback } from "react";
export function UserSexGraphic() {
  const fetchUsers = useCallback(() => getUsers({
    size: 1,
    sex: "M",
  }), []);
  const { data: userMale, error: errorMale, isLoading: isLoadingMale } = useApiRequest(fetchUsers);

  const fetchUsersInactive = useCallback(() => getUsers({
    size: 1,
    sex: "F",
  }), []);
  const { data: userFemale, error: errorFemale, isLoading: isLoadingFemale } = useApiRequest(fetchUsersInactive);



  if (errorMale || errorFemale) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoadingMale || isLoadingFemale) {
    return <GraphicLoading />;
  }
  if (!userMale?.results || !userFemale?.results) {
    return <div>
      <TitleSection title="Usuarios" description="Sexo"  />
      No hay datos de usuarios
    </div>;
  }
  const option = {
    xAxis: {
      data: ["M", "F"]
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [
          userMale.count,
          {
            value: userFemale.count,
            // Specify the style for single bar
            itemStyle: {
              color: '#91cc75',
              shadowColor: '#91cc75',
              borderType: 'dashed',
              opacity: 0.5
            }
          },
        ],
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#73c0de',
          shadowColor: '#5470c6',
          shadowBlur: 3
        }
      }
    ]
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
      <TitleSection title="Sexo" description=" de los usuarios"  />
      <ReactECharts option={option} className="w-full h-full" />
    </div>
  );
}
