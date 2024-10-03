import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import StatsChart from "./StatsChart";
import { useRouter } from "next/navigation";

interface StatsCardProps {
  href?: string;
  heading: string;
  total: string;
  currency?: string;
  statsPercentage: string;
  stats: Array<object>;
  fillColor: string;
}

function StatsCard({
  href = "",
  heading,
  total,
  currency,
  statsPercentage,
  stats,
  fillColor,
}: StatsCardProps) {
  const SP = parseFloat(statsPercentage);
  const router = useRouter();

  return (
    <div
      onClick={() => href !== "" && router.push(href)}
      className={`border cursor-pointer w-full min-w-[240px] xl:min-w-[300px] 2xl:min-w-[360px] xl:w-[30%] bg-white border-[#EBEFF3] shadow-md p-6 flex flex-col`}
    >
      <div className="flex justify-between mb-4">
        <div className="flex sm:flex-col  justify-between sm:justify-start items-center sm:items-start ">
          <div className="text-2xl font-bold">{total}</div>
          <div className="flex text-base font-medium w-full justify-between items-center text-[#5D738A]">
            <h1>{heading}</h1>
            {currency && <h1>{currency}</h1>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {SP > 0 ? (
            <AiOutlineArrowUp color="#0CBC8B" />
          ) : (
            <AiOutlineArrowDown color="#DF4444" />
          )}

          <p
            className={`${
              SP > 0 ? "text-[#0CBC8B]" : "text-[#DF4444]"
            } text-sm font-medium whitespace-nowrap`}
          >
            {parseFloat(statsPercentage)?.toFixed(2)} %
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center gap-5">
        <div className="w-[80vw] h-[20vw] md:w-full md:h-[3vw]">
          <div className="w-full h-full">
            <StatsChart
              customLabel={heading?.split(" ")[1]}
              stats={stats}
              fillColor={fillColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
