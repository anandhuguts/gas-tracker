"use client";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function CandlestickChart() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
      layout: {
        background: { color: "#111" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
    });

    const series = chart.addCandlestickSeries();

    series.setData([
      {
        time: 1721460000, // corresponds to 2024-07-20 10:00:00 UTC
        open: 20,
        high: 25,
        low: 18,
        close: 22,
      },
      {
        time: 1721460900, // 15 minutes later
        open: 22,
        high: 26,
        low: 21,
        close: 24,
      },
      {
        time: 1721461800,
        open: 24,
        high: 27,
        low: 22,
        close: 23,
      },
    ]);

    return () => chart.remove();
  }, []);

  return <div ref={chartContainerRef} />;
}
