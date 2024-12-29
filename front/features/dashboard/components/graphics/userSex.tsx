"use client";
import { TitleSection } from "@/components/utils/titleSection";
import ReactECharts from "echarts-for-react";
export function UserSexGraphic() {
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
          { value: 335, name: "Usuario verificado" },
          { value: 310, name: "Usuario no verificado" },
        ],
      },
    ],
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
      <TitleSection title="Usuarios " description="verificados"  />
      <ReactECharts option={option} className="w-full h-full" />
    </div>
  );
}
