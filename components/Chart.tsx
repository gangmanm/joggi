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
}

export default function DoughnutChart({ data }: DoughnutChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // 데이터 그룹화
  const groupedData = data.reduce<
    Record<
      string,
      { amount: number; color: string; name: string; setting: string }
    >
  >((acc, item) => {
    const tag = item.tag || "No Tag";
    const amount = Number(item.amount) || 0;
    const color = item.color || "#cccccc";
    const name = item.tag || "No Name";
    const setting = item.setting || "default";

    if (!acc[tag]) {
      acc[tag] = { amount: 0, color, name, setting }; // 태그가 처음 등장한 경우
    }

    acc[tag].amount += amount; // 동일 태그의 금액 누적
    return acc;
  }, {});

  // income과 outcome 데이터를 분리 및 정렬
  const incomeData = Object.values(groupedData)
    .filter((item) => item.setting === "income")
    .sort((a, b) => b.amount - a.amount); // 내림차순 정렬

  const outcomeData = Object.values(groupedData)
    .filter((item) => item.setting === "outcome")
    .sort((a, b) => b.amount - a.amount); // 내림차순 정렬

  // 정렬된 데이터를 결합
  const sortedData = [...incomeData, ...outcomeData];

  const values = sortedData.map((item) => item.amount); // 금액
  const labels = sortedData.map((item) => item.name); // 이름 (라벨)
  const colors = sortedData.map((item) => item.color); // 색상

  // 그래프의 `borderColor`를 `setting` 값에 따라 설정
  const borderColors = sortedData.map((item) =>
    item.setting === "income" ? "red" : "blue"
  ); // 조건에 따라 빨간색 또는 파란색

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
        labels, // 추가된 라벨
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: borderColors, // 조건부로 설정된 테두리 색상
            borderWidth: 2, // 테두리 두께
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
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}
