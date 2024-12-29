"use client";
import { TitleSection } from "@/components/utils/titleSection";
import ReactECharts from "echarts-for-react";
import { color } from "framer-motion";
export  function UserActiveGraphic() {
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
          { value: 335, name: "Usuario activo" },
          { value: 310, name: "Usuario inactivo" },
        ],
      },
    ],
  };
  return <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
    <TitleSection title="Usuarios " description="activos"  />
    <ReactECharts option={option} className="w-full h-full" />
  </div>;
}
