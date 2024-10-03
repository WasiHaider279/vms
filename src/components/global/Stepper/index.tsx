import React from "react";
import { FaIdBadge } from "react-icons/fa";

const defaultTexts = ["Basic Info", "Store Info", "Submission Details"];

const Stepper = ({ texts = defaultTexts, stepper, completed }:any) => {
  return (
    <div className="stepper relative">
      {stepper.map((step:any, index:any) => (
        <React.Fragment key={index}>
          <div className="flex items-center justify-center">
            <div
              className={`step ${
                step ? "bg-blue-600 text-white" : " text-blue-600"
              }`}
            >
              {completed[index] ? <FaIdBadge /> : index + 1}
            </div>
            <div
              className={`text-sm font-poppins top-12 whitespace-nowrap hidden absolute lg:block`}
            >
              {texts[index]}
            </div>
          </div>
          {index !== stepper.length - 1 ? <div className="line" /> : ""}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
