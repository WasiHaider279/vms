import React from "react";
import FormatNumber from "@/utils/formatNumber";

type Props = {
  active?: boolean;
  payload: Array<{ value: number }>;
  label: number;
  name?: string;
};

function StatsTooltip({ active, payload, label, name }: Props) {
  const show = active && payload && payload.length;
  if (!show) return null;

  const month = label;
  const total =
    payload[0]?.value < 1000
      ? payload[0]?.value
      : FormatNumber(payload[0]?.value);
  const date = new Date();
  date.setMonth(month);

  return (
    <div>
      <p>{`${name} : ${total}`}</p>
      <p
        style={{ color: "#5D738A", fontSize: 14 }}
      >{`Month: ${date.toLocaleDateString("en-GB", {
        month: "short",
      })}`}</p>
    </div>
  );
}

export default StatsTooltip;
