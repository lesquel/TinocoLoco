"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUsers } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";
export function UserEmailVerificate() {
  const fetchUsers = useCallback(() => getUsers({
    size: 1,
    email_verified: true,
  }),
  []);
  const { data: userVerified, error: errorVerified, isLoading: isLoadingVerified } = useApiRequest(fetchUsers);

  const fetchUsersInactive = useCallback(() => getUsers({
    size: 1,
    email_verified: false,
  }), []);
  const { data: userInactive, error: errorInactive, isLoading: isLoadingInactive } = useApiRequest(fetchUsersInactive);



  if (errorVerified || errorInactive) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoadingVerified || isLoadingInactive) {
    return <GraphicLoading />;
  }
  if (!userVerified?.results || !userInactive?.results) {
    return <div>
      <TitleSection title="Usuarios " description="verificados"  />
      No hay datos de usuarios
      </div>;
  }
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Usuario verificado", "Usuario no verificado"],
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "Usuarios",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: userVerified.count, name: "Usuario verificado" },
          { value: userInactive.count, name: "Usuario no verificado" },
        ],
      },
    ],
  };
  console.log("userVerified", userVerified);
  console.log("userInactive", userInactive);
  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
      <TitleSection title="Usuarios " description="verificados"  />
      <ReactECharts option={option} className="w-full h-full" />
    </div>
  );
}
