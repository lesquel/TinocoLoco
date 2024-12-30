"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getMostPopularServices } from "@/features/services/services/services";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { color } from "framer-motion";
import { useCallback } from "react";
export  function ServiciosMostPopularGraphic() {
  const fetchMosdtPopularServices = useCallback(() => getMostPopularServices({
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
      <TitleSection title="Servicios" description="Más Vistos" />
      No hay servicios
    </div>;
  }

  const dataServices = data.results.map((service) => ({
    name: `${service.service_name} (${service.reservation_count} reservas)`,
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
    <TitleSection title="Servicios" description="Más populares"  />
    <ReactECharts option={option} className="w-full h-full" />
  </div>;
}
