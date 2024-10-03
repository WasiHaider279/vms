import React from "react";

const TimeLine = ({ orderData }: any) => {
  const timeline = orderData?.lineitems[0]?.timeline;
  return (
    <>
      <div className="w-full border-b-2 pb-2">
        <div className="flex gap-2 items-center justify-between">
          <h3 className="font-bold text-xl">Timeline</h3>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white ">
        <div className="space-y-6 border-l-2 border-dashed">
          {timeline?.map((line: any, index: number) => (
            <React.Fragment key={index}>
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-6">
                  <h4 className="font-bold text-blue-600">{line?.user}</h4>
                  <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                    {line?.status}
                  </p>
                  <span className="mt-1 block text-sm font-semibold text-blue-600">
                    {new Date(line?.dated).toDateString()}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeLine;
