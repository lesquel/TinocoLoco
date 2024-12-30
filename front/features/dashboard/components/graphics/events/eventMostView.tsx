"use client";
import { GraphicLoading } from "@/components/utils/loagins/graphicLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getMostViewedEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import ReactECharts from "echarts-for-react";
import { useCallback } from "react";

export function EventsMostViewGraphic() {
  const fetchMostPopularEvents = useCallback(
    () =>
      getMostViewedEvents({
        size: 5,
      }),
    []
  );
  const { data, error, isLoading } = useApiRequest(fetchMostPopularEvents);

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

  const dataEvents = data.results.map((event) => ({
    name: event.event_name,
    value: event.view_count,
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b}: {c} vistas",
    },
    xAxis: {
      type: "category",
      data: dataEvents.map((event) => event.name),
      axisLabel: {
        rotate: 30, // Rota las etiquetas si son largas
        fontSize: 12,
        color: "#fff", // Etiquetas en color blanco
      },
      axisLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
        fontSize: 12,
        color: "#fff", // Etiquetas en color blanco
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#444", // Líneas de división sutiles
        },
      },
    },
    series: [
      {
        name: "Vistas",
        type: "bar",
        data: dataEvents.map((event) => event.value),
        barWidth: "50%",
        itemStyle: {
          color: "#6B5B95", // Color personalizado para las barras
          barBorderRadius: [4, 4, 0, 0], // Bordes redondeados en la parte superior
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.2)",
        },
        emphasis: {
          itemStyle: {
            color: "#FF6F61", // Color de barra en hover
            shadowBlur: 15,
            shadowColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      },
    ],
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
      top: "15%",
    },
    backgroundColor: "#2b2b2b", // Fondo oscuro
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto">
      <TitleSection title="Eventos" description="Más Vistos" />
      <ReactECharts option={option} className="w-full h-[400px]" />
    </div>
  );
}
