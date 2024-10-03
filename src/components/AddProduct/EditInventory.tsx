import React, { useState } from "react";
import Button from "../global/Button";
import { useGetInventoryQuery } from "@/redux/services/productApi";
import Loader from "../global/Loader";

const EditInventory = ({
  data,
  combination,
  updateDimension,
  updateWeight,
  setInventory,
  inventory,
  combinationIndex,
  updateInventory,
}: any) => {
  const { data: inventoryData, isLoading } = useGetInventoryQuery({
    variant: combination._id,
  });

  // const myinventoryData = combination.inventory.forEach(
  //   (inventoryItem: any, index: any) => {
  //     const newItem = inventoryData?.data?.items[0];
  //     if (newItem) {
  //       inventoryItem.sku = newItem.sku || "";
  //       inventoryItem.barcode = newItem.barcode || "";
  //       inventoryItem.price = newItem.price || "";
  //       inventoryItem.quantity = newItem.quantity || "";
  //       inventoryItem.variant = newItem.variant || "";
  //       inventoryItem.location = newItem.location._id || "";
  //     }
  //   }
  // );

  return (
    <>
      <style>
        {`
          .scrollable-container::-webkit-scrollbar {
            width: 0;
          }

          .scrollable-container::-webkit-scrollbar-track {
            background-color: transparent;
          }

          .scrollable-container::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
      </style>
      <div className="bg-white max-h-[600px] px-4 overflow-hidden">
        <h1 className="text-blue-600 text-xl px-4 pb-4 font-bold font-inter leading-[30px] uppercase">
          {combination.options.join(",")}
        </h1>
        <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
          <label className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]">
            Weight
          </label>
          <input
            className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
            type="number"
            placeholder="Weight"
            value={combination.weight}
            onChange={(e) => updateWeight(e, combinationIndex, e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-gray-900 text-sm font-medium font-inter leading-[21px] mt-3 mb-1">
            Dimensions
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
              <label className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]">
                Width
              </label>
              <input
                className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                type="number"
                placeholder="Width"
                value={combination.dimensions.width}
                onChange={(e) =>
                  updateDimension(e, combinationIndex, e.target.value, "width")
                }
              />
            </div>
            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
              <label className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]">
                Height
              </label>
              <input
                className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                type="number"
                placeholder="Height"
                value={combination.dimensions.height}
                onChange={(e) =>
                  updateDimension(e, combinationIndex, e.target.value, "height")
                }
              />
            </div>
            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
              <label className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]">
                Length
              </label>
              <input
                className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                type="number"
                placeholder="Length"
                value={combination.dimensions.length}
                onChange={(e) =>
                  updateDimension(e, combinationIndex, e.target.value, "length")
                }
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-around mt-4">
          <div className="w-1/3">
            <h1 className="text-zinc-800 text-xs font-bold font-inter leading-[18px]">
              Location Name
            </h1>
          </div>
          <div className="flex justify-around w-2/3">
            <h1 className="text-zinc-800 text-xs  font-bold font-inter leading-[18px]">
              Price
            </h1>
            <h1 className="text-zinc-800 text-xs  font-bold font-inter leading-[18px]">
              Quantity
            </h1>
          </div>
        </div>
        <div className="max-h-screen overflow-y-auto scrollable-container">
          {isLoading ? (
            <div className="my-4">
              <Loader />
            </div>
          ) : (
            data?.map((data: any, invIndex: any, array: any) => {
              return (
                <>
                  <hr
                    className={`border border-zinc-100 ${
                      invIndex === 0 ? "my-2" : "my-8"
                    }`}
                  ></hr>
                  <div className="grid grid-cols-3 gap-2 px-1">
                    <h1 className="text-blue-600 text-sm font-bold font-inter leading-[21px] uppercase">
                      {data?.name}
                    </h1>
                    <input
                      className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                      placeholder="RS 0.00"
                      name="price"
                      required
                      value={combination.inventory[invIndex].price}
                      type="number"
                      // onChange={handleChange}
                      onChange={(e) =>
                        updateInventory(
                          e,
                          combinationIndex,
                          invIndex,
                          e.target.value,
                          data._id,
                          combination.variantId
                        )
                      }
                    />
                    <input
                      name="quantity"
                      className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                      placeholder="0"
                      required
                      type="number"
                      value={combination.inventory[invIndex].quantity}
                      onChange={(e) =>
                        updateInventory(
                          e,
                          combinationIndex,
                          invIndex,
                          e.target.value,
                          data._id,
                          combination.variantId
                        )
                      }
                    />
                  </div>
                  <div
                    className={`flex my-8 gap-2 px-1 w-full ${
                      invIndex === array.length - 1 ? "mb-[500px]" : ""
                    }`}
                  >
                    <div>
                      <label
                        htmlFor="sku"
                        className=" text-gray-500 text-sm font-medium font-inter leading-[21px]"
                      >
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                        name="sku"
                        required
                        value={combination.inventory[invIndex].sku}
                        onChange={(e) =>
                          updateInventory(
                            e,
                            combinationIndex,
                            invIndex,
                            e.target.value,
                            data._id,
                            combination.variantId
                          )
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="barcode"
                        className=" text-gray-500 text-sm font-medium font-inter leading-[21px]"
                      >
                        Barcode (ISBN, UPC, GTIN, etc.)
                      </label>
                      <input
                        name="barcode"
                        className="h-[37px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 w-full text-sm font-normal font-inter"
                        required
                        value={combination.inventory[invIndex].barcode}
                        onChange={(e) =>
                          updateInventory(
                            e,
                            combinationIndex,
                            invIndex,
                            e.target.value,
                            data._id,
                            combination.variantId
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default EditInventory;
