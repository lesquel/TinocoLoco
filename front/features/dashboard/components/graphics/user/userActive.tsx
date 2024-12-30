"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getUser, getUsers } from "@/features/auth/services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { color } from "framer-motion";
import { useCallback } from "react";
export  function UserActiveGraphic() {
  const fetchUsers = useCallback(() => getUsers({
    size: 1,
    is_active: true,
  }), []);
  const { data: userActive, error: errorActive, isLoading: isLoadingActive } = useApiRequest(fetchUsers);

  const fetchUsersInactive = useCallback(() => getUsers({
    size: 1,
    is_active: false,
  }), []);
  const { data: userInactive, error: errorInactive, isLoading: isLoadingInactive } = useApiRequest(fetchUsersInactive);

  console.log("userInactive", userInactive);
  console.log("userActive", userActive);


  if (errorActive || errorInactive) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoadingActive || isLoadingInactive) {
    return <GraphicLoading />;
  }
  if (!userActive?.results || !userInactive?.results) {
    return <div>
      <TitleSection title="Usuarios" description="Activos" />
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
      data: ["Usuario activo", "Usuario inactivo"],
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
          { value: userActive.count, name: "Usuario activo" },
          { value: userInactive.count, name: "Usuario inactivo" },
        ],
      },
    ],
  };

  console.log("userActive", userActive);
  console.log("userInactive", userInactive);
  return <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
    <TitleSection title="Usuarios " description="activos"  />
    <ReactECharts option={option} className="w-full h-full" />
  </div>;
}
