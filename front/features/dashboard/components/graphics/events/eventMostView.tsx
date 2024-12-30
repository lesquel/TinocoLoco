"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getMostViewedEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";
export  function EventsMostViewGraphic() {
  const fetchMosdtPopularServices = useCallback(() => getMostViewedEvents({
    size: 5,
  }), []);
  const {data, error, isLoading} = useApiRequest(fetchMosdtPopularServices);
  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <GraphicLoading />;
  }

  if (!data?.results) {
    return <div>No hay servicios</div>;
  }

  const dataServices = data.results.map((service) => ({
    name: service.service_name,
    value: service.view_count,
  }));

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: 'pie',
        data: dataServices,
        roseType: 'area',
        radius: [0, '70%'],
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    ]
  };

  return <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
    <TitleSection title="Servicios" description="Más Vistos"  />
    <ReactECharts option={option} className="w-full h-full" />
  </div>;
}
