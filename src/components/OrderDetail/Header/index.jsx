import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="flex justify-between items-start flex-wrap gap-4">
      <div className="flex gap-2">
        <ArrowLeftIcon className="w-6" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl">ISM1001MART</h2>
            <div className="bg-[#FFD6A4] rounded-full px-2 py-1 text-xs  font-semibold">
              Payment pending
            </div>
            <div className="bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold">
              Unfulfiled
            </div>
          </div>
          <p className="text-xs pt-1">
            September 7, 2023 at 10:28 am from Draft Orders
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="py-1 px-2 rounded-lg shadow-sm bg-slate-300 text-sm hover:bg-slate-400">
          Restock
        </button>
        <button className="py-1 px-2 rounded-lg shadow-sm bg-slate-300 text-sm hover:bg-slate-400">
          Edit
        </button>
        <button className="py-1 px-2 rounded-lg shadow-sm bg-slate-300 text-sm hover:bg-slate-400">
          More actions
        </button>
      </div>
    </div>
  );
};

export default Header;
