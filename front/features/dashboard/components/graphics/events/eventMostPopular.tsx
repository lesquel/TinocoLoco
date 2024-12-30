"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getMostPopularEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { color } from "framer-motion";
import { useCallback } from "react";
export  function EventsMostPopularGraphic() {
  const fetchMosdtPopularServices = useCallback(() => getMostPopularEvents({
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
    return <div>
      <TitleSection title="Eventos" description="Más Vistos" />
      No hay eventos
    </div>;
  }

  const dataServices = data.results.map((service) => ({
    name: `${service.event_name} (${service.reservation_count} reservas)`,
    value: service.reservation_count,
  }));

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: 'pie',
        data: dataServices,
        roseType: 'area'
        
      }
    ]
  };

  return <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
    <TitleSection title="Eventos" description="Más populares"  />
    <ReactECharts option={option} className="w-full h-full" />
  </div>;
}
