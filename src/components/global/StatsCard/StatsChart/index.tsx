// @ts-nocheck
"use client";
import FormatNumber from "@/utils/formatNumber";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsTooltip from "../StatsTooltip";

interface StatsChartProps {
  stats: Array<object>;
  fillColor: string | "#1C64F2";
  customLabel: string;
}

function StatsChart({ stats, fillColor, customLabel }: StatsChartProps) {
  const data = [...(stats ? stats : [])].map((item) => ({
    ...item,
    Total: item?.y,
  }));
  const gradientId = `colorPv-${fillColor.replace("#", "")}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={200}
        height={120}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fillColor} stopOpacity={0.5} />
            <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient> */}
          <linearGradient id={gradientId} m x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fillColor} stopOpacity={0.5} />
            <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" height={0} />
        <YAxis dataKey="y" width={0} />
        <Tooltip
          content={<StatsTooltip name={customLabel} />}
          formatter={(value: number) =>
            value < 1000 ? value : FormatNumber(value)
          }
        />
        <Area
          type="monotone"
          dataKey="Total"
          stroke={fillColor}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default StatsChart;
