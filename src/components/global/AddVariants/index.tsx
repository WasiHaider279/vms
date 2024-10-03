//@ts-nocheck
import React, { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import CheckField from "@/components/AddProduct/CheckField";
import Modal from "../Modal";
import Inventory from "@/components/AddProduct/Inventory";
import { HiOutlineTrash } from "react-icons/hi";
import { LiaGripVerticalSolid } from "react-icons/lia";
import { FaGripVertical } from "react-icons/fa";
import Select from "react-select";

type Variant = {
  name: string;
  values: string[];
};

type CombinationStocks = Record<string, number>;
type CombinationSKU = Record<string, number>;
type CombinationBarcode = Record<string, number>;
type CombinationPrices = Record<string, number>;

interface AddVariantsProps {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<FieldValues> | undefined;
  data?: any[];
}

const AddVariants: React.FC<AddVariantsProps> = ({
  register,
  setValue,
  data,
}) => {
  const [options, setOptions] = useState<string[][]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [inventory, setInventory] = useState<string[][]>([]);
  const [combinations, setCombinations] = useState<string[][]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [variantId, setVariantId] = useState<string>("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const showModel = (id: string) => {
    setVariantId(id);
    setOpen(true);
  };

  const optionName = [
    { value: "Color", label: "Color" },
    { value: "Size", label: "Size" },
    { value: "Material", label: "Material" },
    // Add more options as needed
  ];

  const generateRandomId = () => {
    // Logic to generate a random ID (you can use UUID or any other method)
    return Math.random().toString(36).substring(2, 11);
  };

  const addVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    if (variants.length < 3) {
      setVariants([...variants, { name: "", view: false, values: [""] }]);
      setValue("variants", [...variants, { name: "", values: [""] }]);
    }
  };

  const addOption = (e: React.MouseEvent, variantIndex: number) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values.push("");
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const updateVariantName = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number,
    name: string
  ) => {
    // e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].name = name;
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
    setIsButtonClicked(true);
  };

  const viewVariant = (e: React.MouseEvent, variantIndex: number) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].view = true;
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
    setIsButtonClicked(true);
  };

  const changeVariant = (e: React.MouseEvent, variantIndex: number) => {
    e.preventDefault();
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].view = false;
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
    updatedVariants[variantIndex].values.splice(optionIndex, 1);
    setVariants(updatedVariants);
    setValue("variants", updatedVariants);
  };

  const generateCombinations = useMemo(() => {
    const newCombinations: string[][] = [];
    const variantsLength = variants.length;

    if (variantsLength > 0) {
      const variantOptions = variants.map((variant) => variant.values);

      const combine = (current: string[], index: number) => {
        if (index === variantsLength) {
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
          return;
        }
        for (let i = 0; i < variantOptions[index].length; i++) {
          combine([...current, variantOptions[index][i]], index + 1);
        }
      };

      combine([], 0);
    }
    setCombinations(newCombinations);
    setValue("combinations", newCombinations);
    setIsButtonClicked(false);
    return newCombinations;
  }, [isButtonClicked]);
  // }, [variants, setValue, isButtonClicked]);

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
      {variants.map((variant, variantIndex) => (
        <div
          key={variantIndex}
          className="flex flex-col w-full bg-white p-4 rounded-lg my-3"
        >
          {variant.view ? (
            <div className="flex justify-between">
              <div className="flex gap-10 justify-center items-center">
                <div className="text-sm text-gray-500">
                  <FaGripVertical />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-inter font-semibold text-sm">
                    {variant.name}
                  </div>
                  <div className="flex gap-3">
                    {variant.values.map((option, optionIndex) => (
                      <div className="border  font-inter text-gray-600  px-3 bg-gray-100 text-sm rounded-lg">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="cursor-pointer border rounded-lg text-sm font-inter font-medium py-1 px-3 hover:scale-110"
                  onClick={(e) => changeVariant(e, variantIndex)}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                <label className="block self-stretch text-zinc-800 text-sm font-medium font-inter">
                  Option name
                </label>
                <div className="w-full flex justify-center items-center gap-3">
                  <div className="text-xl text-gray-500">
                    <FaGripVertical />
                  </div>
                  <Select
                    value={
                      variant.name !== ""
                        ? { value: variant.name, label: variant.name }
                        : null
                    }
                    placeholder="Select an Option Name"
                    onChange={(selectedOption) =>
                      updateVariantName(
                        selectedOption.label,
                        variantIndex,
                        selectedOption.value
                      )
                    }
                    options={optionName}
                    className="w-full rounded-lg"
                    styles={{
                      input: (base) => ({
                        ...base,
                        "input:focus": {
                          boxShadow: "none",
                        },
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        borderRadius: "8px",
                        backgroundColor: "rgb(249, 250, 251)",
                        fontSize: "14px",
                      }),
                    }}
                  />
                  {/* <input
                    type="text"
                    placeholder={`Variant ${variantIndex + 1} Name`}
                    className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-gray-300 text-sm font-normal font-inter"
                    value={variant.name}
                    onChange={(e) =>
                      updateVariantName(e, variantIndex, e.target.value)
                    }
                  /> */}
                  <button
                    onClick={(e) => deleteVariant(e, variantIndex)}
                    className="p-2 border rounded-lg text-lg hover:scale-110 cursor-pointer"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>

              <div className="my-2" />
              <label className="ml-6 mb-1 text-zinc-800 text-sm font-medium font-inter leading-[21px]">
                Option values
              </label>
              {variant.values.map((option, optionIndex) => (
                <div className="flex ml-6 my-1" key={optionIndex}>
                  <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                    <div className="w-full flex justify-center items-center gap-3">
                      <div className="text-xl text-gray-500">
                        <FaGripVertical />
                      </div>
                      <input
                        type="text"
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-gray-300 text-sm font-normal font-inter"
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
                      {optionIndex !== 0 && (
                        <button
                          onClick={(e) =>
                            deleteOption(e, variantIndex, optionIndex)
                          }
                          className="p-2 border rounded-lg text-lg hover:scale-110 cursor-pointer"
                        >
                          <HiOutlineTrash />
                        </button>
                      )}
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
              </div>

              <button
                onClick={(e) => viewVariant(e, variantIndex)}
                className="w-[40%] h-[38px] px-5 py-2.5 bg-primary rounded-lg justify-center items-center text-white text-xs font-semibold font-inter"
              >
                Done
              </button>
            </>
          )}
        </div>
      ))}

      {variants.length < 3 && (
        <div className="flex w-full bg-white p-4 rounded-lg my-3">
          <div onClick={(e) => addVariant(e)} className="cursor-pointer">
            <span className=" text-blue-600 text-sm font-medium font-inter leading-[21px]">
              + Add variant
            </span>
          </div>
        </div>
      )}
      {/* combinations */}

      {combinations.length > 0 && (
        <div className="flex flex-col w-full bg-white p-4 rounded-lg my-3">
          <table className="mt-5 w-full">
            <thead>
              <tr className="text-center text-gray-500 text-[10.83px] font-medium font-inter leading-[13.54px]">
                <th className="py-3 px-6 text-left">Product Variant</th>
                <th className="py-3 px-6 text-center">Weight</th>
                <th className="py-3 px-6 text-center">Dimensions</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light font-inter">
              {combinations.map((combination, index) => (
                <tr className="border-b border-gray-200" key={index}>
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
                        onClick={() => showModel(combination.variantId)}
                      >
                        <FaPencilAlt className="w-4 h-4" />
                      </div>
                      {/* <div
                        className="p-1 rounded-lg border border-zinc-100 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
                        onClick={(e) => handleDeleteCombination(e, combination)}
                      >
                        <MdDelete className="w-5 h-5" />
                      </div> */}
                    </div>
                  </td>
                  {variantId === combination.variantId && (
                    <Modal open={open} setOpen={setOpen}>
                      <Inventory
                        data={data}
                        combination={combination}
                        combinations={combinations}
                        setCombinations={setCombinations}
                        updateDimension={updateDimension}
                        inventory={inventory}
                        setInventory={setInventory}
                        updateWeight={updateWeight}
                        combinationIndex={index}
                        updateInventory={updateInventory}
                        setOpen={setOpen}
                        setValue={setValue}
                      />
                    </Modal>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddVariants;
