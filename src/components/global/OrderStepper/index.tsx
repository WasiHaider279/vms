"use client";

type Props = {
  title: string;
  border: boolean;
};

const arr = ["Pending", "Pending", "Ready to Transit", "Pickup", "On Way"];
const TimelineItem = ({ title, border }: Props) => (
  <div className="flex items-start gap-4">
    <div className="relative flex flex-col items-center">
      <div className=" flex-shrink-0 h-4 w-4 rounded-full bg-blue-500"></div>

      <div className="">
        <h4 className=" text-xs text-blue-500">{title}</h4>
      </div>
    </div>
    {border && <hr className=" w-10  mt-2 border-b border-gray-300" />}
  </div>
);

export default function OrderStepper() {
  return (
    <>
      <div className="flex items-center justify-center px-4 ">
        <div className="flex  gap-4">
          {arr.map((title, index) => (
            <TimelineItem
              key={index}
              title={title}
              border={arr.length - 1 == index ? false : true}
            />
          ))}
        </div>
      </div>
    </>
  );
}
