"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Budget } from "../src/types/budget";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: Budget[];
  setting: string;
}

export default function DoughnutChart({ data, setting }: DoughnutChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // 태그별로 데이터를 그룹화
  const groupedData = data
    .filter((item) => item.setting === setting) // setting에 따라 필터링
    .reduce<Record<string, { amount: number; color: string }>>((acc, item) => {
      const tag = item.tag || "No Tag";
      const amount = Number(item.amount) || 0;
      const color = item.color || "#cccccc";

      if (!acc[tag]) {
        acc[tag] = { amount: 0, color }; // 태그가 처음 등장한 경우
      }

      acc[tag].amount += amount; // 동일 태그의 금액 누적
      return acc;
    }, {});

  const values = Object.values(groupedData).map((item) => item.amount); // 금액
  const colors = Object.values(groupedData).map((item) => item.color); // 색상

  useEffect(() => {
    if (!chartRef.current) return;

    // 기존 차트 인스턴스가 있다면 제거
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 새로운 차트 생성
    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [data, setting]);

  return <canvas ref={chartRef}></canvas>;
}
