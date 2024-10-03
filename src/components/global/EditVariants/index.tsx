//@ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import CheckField from "@/components/AddProduct/CheckField";
import Modal from "../Modal";
import Inventory from "@/components/AddProduct/Inventory";
import { HiOutlineTrash } from "react-icons/hi";
import { LiaGripVerticalSolid } from "react-icons/lia";
import { useGetInventoryQuery } from "@/redux/services/productApi";
import EditInventory from "@/components/AddProduct/EditInventory";

type CombinationStocks = Record<string, number>;
type CombinationSKU = Record<string, number>;
type CombinationBarcode = Record<string, number>;
type CombinationPrices = Record<string, number>;

interface AddVariantsProps {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<FieldValues> | undefined;
  data?: any[];
  variantsData?: any[];
  combinationData?: any[];
}
type Variant = {
  name: string;
  values: string[];
};

const EditVariants: React.FC<AddVariantsProps> = ({
  register,
  setValue,
  data,
  variantsData,
  combinationData,
}) => {
  const [inventory, setInventory] = useState<string[][]>([]);
  const [combinations, setCombinations] = useState<string[][]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [variantId, setVariantId] = useState<string>("");
  const [variants, setVariants] = useState<Variant[]>(variantsData || []);

  const showModel = (id: string) => {
    setVariantId(id);
    setOpen(true);
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 11);
  };

  const addVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    if (variants.length < 3) {
      setVariants([...variants, { name: "", values: [""] }]);
      setValue("variants", [...variants, { name: "", values: [""] }]);
    }
  };

  const addOption = (e: React.MouseEvent, variantIndex: number) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      values: [...updatedVariants[variantIndex].values, ""],
    };
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const updateVariantName = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number,
    name: string
  ) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      name: name,
    };
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const updateWeight = (
    e: React.ChangeEvent<HTMLInputElement>,
    combinationIndex: number,
    name: string
  ) => {
    e.preventDefault();
    const updatedcombination = [...combinations];
    updatedcombination[combinationIndex].weight = name;
    setCombinations(updatedcombination);
    setValue("combinations", updatedcombination);
  };

  const updateDimension = (
    e: React.ChangeEvent<HTMLInputElement>,
    combinationIndex: number,
    name: string,
    dimensionName: string
  ) => {
    e.preventDefault();
    const updatedcombination = [...combinations];
    updatedcombination[combinationIndex].dimensions[dimensionName] = name;
    setCombinations(updatedcombination);
    setValue("combinations", updatedcombination);
  };

  const updateOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number,
    optionIndex: number,
    option: string
  ) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values = [
      ...updatedVariants[variantIndex].values,
    ];
    updatedVariants[variantIndex].values[optionIndex] = option;
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const updateInventory = (
    e: React.ChangeEvent<HTMLInputElement>,
    combinationIndex: number,
    inventoryIndex: number,
    value: string,
    location: string,
    variant: string
  ) => {
    e.preventDefault();

    const updatedInventory = [...combinations];
    updatedInventory[combinationIndex].inventory[inventoryIndex][
      e.target.name
    ] = value;
    updatedInventory[combinationIndex].inventory[inventoryIndex].location =
      location;
    updatedInventory[combinationIndex].inventory[inventoryIndex].variant =
      variant;
    setCombinations(updatedInventory);
    setValue("combinations", updatedInventory);
  };

  const deleteVariant = (e: React.MouseEvent, variantIndex: number) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants.splice(variantIndex, 1);
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const deleteOption = (
    e: React.MouseEvent,
    variantIndex: number,
    optionIndex: number
  ) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      values: [...updatedVariants[variantIndex].values],
    };
    updatedVariants[variantIndex].values.splice(optionIndex, 1);
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const generateCombinations = useMemo(() => {
    const newCombinations: string[][] = [];
    const variantsLength = variants?.length;

    if (variantsLength > 0) {
      const variantOptions = variants.map((variant) => variant.values);

      const combine = (current: string[], index: number) => {
        if (index === variantsLength) {
          const matchingVariant = combinationData?.find((variant) =>
            current.every((option, i) => variant.options[i] === option)
          );
          if (matchingVariant) {
            const combination = {
              _id: matchingVariant._id,
              options: [...current],
              weight: matchingVariant.weight || "",
              dimensions: {
                width: matchingVariant.dimensions.width || "",
                height: matchingVariant.dimensions.height || "",
                length: matchingVariant.dimensions.length || "",
              },
              inventory: data?.map((data_item, index) => ({
                sku: "",
                barcode: "",
                price: "",
                quantity: "",
                variant: "",
                location: "",
              })),
            };
            newCombinations.push(combination);
          } else {
            const combination = {
              variantId: generateRandomId(),
              options: [...current],
              weight: "",
              dimensions: {
                width: "",
                height: "",
                length: "",
              },
              inventory: data?.map((data_item, index) => ({
                sku: "",
                barcode: "",
                price: "",
                quantity: "",
                variant: "",
                location: "",
              })),
            };
            newCombinations.push(combination);
          }
          return;
        }
        for (let i = 0; i < variantOptions[index]?.length; i++) {
          combine([...current, variantOptions[index][i]], index + 1);
        }
      };

      combine([], 0);
    }
    setCombinations(newCombinations);
    setValue("combinations", newCombinations);
    return newCombinations;
  }, [variants, setValue]);

  const handleDeleteCombination = (
    e: React.MouseEvent,
    combination: string
  ) => {
    e.preventDefault();

    setCombinations(combinations.filter((c) => c !== combination));
    setValue(
      "combinations",
      combinations.filter((c) => c !== combination)
    );
  };

  return (
    <>
      <div className="flex flex-col">
        {variants?.map((variant, variantIndex) => (
          <div key={variantIndex} className="flex flex-col">
            <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
              <label className="block self-stretch text-zinc-800 text-sm font-bold font-inter leading-[21px]">
                Variant name
              </label>
              <div className="w-full flex justify-center items-center gap-3">
                <div className="text-xl">
                  <LiaGripVerticalSolid />
                </div>
                <input
                  type="text"
                  placeholder={`Variant ${variantIndex + 1} Name`}
                  className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-gray-300 text-sm font-normal font-inter leading-[17.50px]"
                  value={variant.name}
                  onChange={(e) =>
                    updateVariantName(e, variantIndex, e.target.value)
                  }
                />
                <button
                  onClick={(e) => deleteVariant(e, variantIndex)}
                  className="p-2 border rounded-lg text-lg hover:scale-110 cursor-pointer"
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>

            <div className="my-2" />
            {variant.values.map((option, optionIndex) => (
              <div className="flex ml-6" key={optionIndex}>
                <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                  <label className="block self-stretch text-zinc-800 text-sm font-bold font-inter leading-[21px]">
                    Option
                  </label>
                  <div className="w-full flex justify-center items-center gap-3">
                    <div className="text-xl">
                      <LiaGripVerticalSolid />
                    </div>
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-gray-300 text-sm font-normal font-inter leading-[17.50px]"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateOption(
                          e,
                          variantIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />
                    <button
                      onClick={(e) =>
                        deleteOption(e, variantIndex, optionIndex)
                      }
                      className="p-2 border rounded-lg text-lg hover:scale-110 cursor-pointer"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-1 mb-4">
              <button
                onClick={(e) => addOption(e, variantIndex)}
                className="text-blue-600 text-xs font-bold font-inter leading-[18px]"
              >
                + Add another option
              </button>
              <hr className="mt-2 border-t-2 border-gray-400" />
            </div>
          </div>
        ))}
        <div className="flex">
          <div onClick={(e) => addVariant(e)} className="cursor-pointer">
            {variants.length > 0 ? (
              <span className=" text-blue-600 text-sm font-medium font-inter leading-[21px]">
                + Add variant
              </span>
            ) : (
              <span className=" text-blue-600 text-sm font-medium font-inter leading-[21px]">
                + Add variant
              </span>
            )}
          </div>
        </div>
        {/* combinations */}
        {variants.length > 0 && (
          <div className="">
            <table className="mt-5 w-full">
              <thead>
                <tr className="text-center text-gray-500 text-[10.83px] font-medium font-inter leading-[13.54px]">
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-center">Product Variant</th>
                  <th className="py-3 px-6 text-center">Weight</th>
                  <th className="py-3 px-6 text-center">Dimensions</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {combinations.map((combination, index) => (
                  <tr className="border-b border-gray-200" key={index}>
                    <td className="py-3 px-6">
                      <img
                        className="w-[52.36px] h-[52.36px]"
                        src="https://via.placeholder.com/52x52"
                      />
                    </td>
                    <td className="py-3 px-6 gap-2 text-left whitespace-nowrap font-normal">
                      {combination.options.join(",")}
                    </td>
                    <td className="py-3 px-6 gap-2 text-center whitespace-nowrap font-normal">
                      {combination.weight}
                    </td>
                    <td className="py-3 px-6 gap-2 text-center whitespace-nowrap font-normal">
                      {combination.dimensions.length}x
                      {combination.dimensions.height}x
                      {combination.dimensions.width}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div
                          className="p-1 rounded-lg border border-zinc-100 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
                          onClick={() =>
                            showModel(
                              combination._id
                                ? combination._id
                                : combination.variantId
                            )
                          }
                        >
                          <FaPencilAlt className="w-4 h-4" />
                        </div>
                        <div
                          className="p-1 rounded-lg border border-zinc-100 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
                          onClick={(e) =>
                            handleDeleteCombination(e, combination)
                          }
                        >
                          <MdDelete className="w-5 h-5" />
                        </div>
                      </div>
                    </td>
                    {variantId === combination.variantId ||
                      (variantId === combination._id && (
                        <Modal open={open} setOpen={setOpen}>
                          <EditInventory
                            data={data}
                            combination={combination}
                            updateDimension={updateDimension}
                            inventory={inventory}
                            setInventory={setInventory}
                            updateWeight={updateWeight}
                            combinationIndex={index}
                            updateInventory={updateInventory}
                          />
                        </Modal>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <CheckField
              register={register}
              label="Charge tax on this product"
              type="checkbox"
              name="variantTax"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditVariants;
