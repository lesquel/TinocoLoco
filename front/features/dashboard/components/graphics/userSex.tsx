"use client";
import { TitleSection } from "@/components/utils/titleSection";
import ReactECharts from "echarts-for-react";
export function UserSexGraphic() {
  const option = {
    xAxis: {
      data: ["M", "F"]
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [
          10,
          {
            value: 43,
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
