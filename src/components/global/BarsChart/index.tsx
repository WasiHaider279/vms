import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatsTooltip from "../StatsCard/StatsTooltip";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type Props = {
  fillColor: string;
  stats: Array<object>;
};

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}> = ({ active, payload, label }) => {
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
    </div>
  );
};

export default function BarsChart({ fillColor, stats }: Props) {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          data={stats}
          // margin={{
          //   top: 20,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          <XAxis axisLine={false} dataKey="x" />
          <YAxis width={0} />
          <Tooltip />
          {/* <Legend /> */}
          <Tooltip content={<StatsTooltip payload={[]} label={0} />} />
          <Bar dataKey="y" stackId="a" fill={fillColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
