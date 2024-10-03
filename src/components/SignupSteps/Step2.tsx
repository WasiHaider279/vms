"use client";
import { setRegistration } from "@/redux/features/registerationSlice";
import { useSignUpMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "../global/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Multiselect from "multiselect-react-dropdown";
import { useGetStoreTypesQuery } from "@/redux/services/common/storeType";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCountriesQuery } from "@/redux/services/placesApi";
import { useGetCitiesQuery } from "@/redux/services/placesApi";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const StoreInfo = ({ setStores, setActiveStep }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [storeTypesNames, setStoreTypesNames] = useState([]);
  console.log(storeTypesNames);

  const { data: storeTypes } = useGetStoreTypesQuery({});

  const array =
    storeTypes?.data?.items?.map((item: any) => ({
      value: item.name,
      label: item.name,
    })) || [];
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  }: any = useForm();
  const [skip, setSkip] = useState(true);
  const { data: countryData, isLoading: countryLoading } = useGetCountriesQuery(
    {
      limit: 0,
      "sort[name]": 1,
    }
  );

  const { data: cityData, isFetching } = useGetCitiesQuery(
    {
      country: watch("country"),
      limit: 0,
      "sort[name]": 1,
    },
    { skip }
  );

  const dispatch = useAppDispatch();
  const { data: step1 } = useAppSelector(
    (state: any) => state.registerationReducer
  );
  console.log(step1);

  const [signUp, { isSuccess, isLoading, isError, error }] =
    useSignUpMutation();

  const onSubmit = (formData: any) => {
    console.log("here its");
    let selectedIds = storeTypesNames.map((nameObj: { value: string }) => {
      let storeType = storeTypes?.data?.items.find(
        (item: any) => item.name === nameObj.value
      );
      return storeType ? storeType._id : null;
    });

    console.log(selectedIds);
    setStores(selectedIds);
    const newData = { ...step1, ...formData, step: "2" };

    const data = new FormData();
    selectedIds.forEach((id, index) => {
      if (id !== null) {
        data.append("storeTypes[]", id);
      }
    });
    Object.entries(newData)?.forEach(([key, value]: any) => {
      if (key === "storeImage") {
        data.append(key, value[0]);
        return;
      }
      if (key === "cnicBack" || key === "cnicFront") {
        const file = value[0];
        data.append("cnicImages", file);
        return;
      }
      data.append(key, value);
    });
    for (let key of data.keys()) {
      console.log(key + ", " + data.get(key));
    }
    signUp(data)
      .unwrap()
      .then((res) => {
        console.log(res, "res");
        success("Step 2 completed successfully");
        setActiveStep(2);
        dispatch(setRegistration(getValues()));
      })
      .catch((err) => {
        console.log(err, "err");
        // failure(`${error?.data?.message.map((msg: string) => `\n${msg}`)}`);
        failure(err?.data?.message || "An error occurred");
      });
  };
  const handleSelectChange = (selectedOptions: any) => {
    // Update the state with the selected values
    setStoreTypesNames(selectedOptions);
  };
  useEffect(() => {
    if (watch("country")) {
      setSkip(false);
    }
  }, [watch("country")]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 text-centre ml-[120px] mr-[120px] pl-[250px] pr-[250px] gap-8">
            <div>
              <Label className=" mt-4" htmlFor="storeName">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Store Name*
                </span>
              </Label>
              <input
                className="input-field"
                id="storeName"
                type="text"
                placeholder="Enter your store name"
                {...register("storeName", {
                  required: "Please enter your store name.",
                })}
              />
              {errors.storeName && (
                <span className="text-red-500 text-sm italic">
                  {errors.storeName.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="storeLogo">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Store Logo*
                </span>
              </Label>
              <input
                className="block w-full text-sm border text-slate-500 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="storeLogo"
                type="file"
                {...register("storeImage", {
                  validate: (value: any) => {
                    if (!value.length) {
                      return "Please attach a valid store logo image.";
                    }

                    const fileType = value[0]?.type;
                    const fileSize = value[0]?.size / 1024 / 1024; // Size in MB

                    if (
                      !fileType.includes("image/png") &&
                      !fileType.includes("image/jpeg")
                    ) {
                      return " Only .png, .jpeg, or .jpg are allowed.";
                    }

                    if (fileSize > 2) {
                      return "Image size should not exceed 2MB.";
                    }

                    return true;
                  },
                })}
              />
              {errors.storeImage && (
                <span className="text-red-500 text-sm italic">
                  {errors.storeImage.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="slugName">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Slug Name*
                </span>
              </Label>
              <input
                className="input-field"
                // className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="storeSlug"
                type="text"
                {...register("storeSlug", {
                  required: "Slug Name is required.",
                  pattern: {
                    value: /^[^\s]+$/,
                    message: "Slug Name cannot contain spaces.",
                  },
                })}
              />
              {errors.storeSlug && (
                <span className="text-red-500 text-sm italic">
                  {errors.storeSlug.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="storeType">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Store Type*
                </span>
              </Label>
              <Select
                styles={{
                  // control: (provided, state) => ({
                  //   ...provided,
                  //   height: "40px",
                  //   margin: "0px",
                  //   padding: "0px 0px 0px 5px",
                  //   border:"none",
                  // }),
                  control: (provided, state) => ({
                    ...provided,
                    height: "43px",
                    margin: "0px",
                    padding: "0px 0px 0px 5px",
                    borderRadius: "5px", // Add rounded border
                    border: "1px solid #CFCFCF",
                    borderColor: "#CFCFCF",
                    outline: "none",
                    transition: "border-color 0.3s ease-in-out",
                    "&:focus": {
                      borderColor: "#3669C9",
                    },
                  }),
                  // placeholder: (provided, state) => ({
                  //   ...provided,
                  //   height: "40px",
                  //   margin: "0px",
                  //   padding: "0px 0px 0px 5px",
                  // }),
                  // menu: (provided, state) => ({
                  //   ...provided,
                  //   zIndex: 9999,
                  // }),
                }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={array}
                onChange={handleSelectChange}
                value={storeTypesNames}
              ></Select>

              {errors.storeType && (
                <span className="text-red-500 italic">
                  {errors.storeType.message}
                </span>
              )}
            </div>

            <div>
              <Label className=" mt-4" htmlFor="country">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Country*
                </span>
              </Label>
              <select
                {...register("country", {
                  required: "Please choose a country.",
                })}
                className="input-field text-slate-500"
                defaultValue="Choose a country"
              >
                <option className="text-slate-500">Choose Country</option>
                {countryData?.data?.items?.map((country: any) => (
                  <option key={country} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-500 italic">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="city">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  City*
                </span>
              </Label>
              <select
                {...register("city", {
                  required: "Please choose a city required",
                })}
                className="input-field text-slate-500"
                defaultValue="Choose a city"
              >
                {isFetching ? (
                  <option value={"Choose a city"}>Select</option>
                ) : (
                  cityData?.data?.items.map((city: any) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))
                )}
              </select>
              {errors.city && (
                <span className="text-red-500 italic">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="address">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Address*
                </span>
              </Label>
              <input
                className="input-field"
                // className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="address"
                type="text"
                {...register("address", {
                  required: "Please enter the address.",
                })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm italic">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="locationName">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Location Name*
                </span>
              </Label>
              <input
                className="input-field"
                // className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="locationName"
                type="text"
                {...register("locationName", {
                  required: "Please enter the Location Name.",
                })}
              />
              {errors.locationName && (
                <span className="text-red-500 text-sm italic">
                  {errors.locationName.message}
                </span>
              )}
            </div>
            <Button
              href="/signup-process"
              style={{ borderColor: "blue" }}
              className="!border !border-primary hover:text-blue-600"
              color="light"
            >
              Back
            </Button>

            <button className="btn" type="submit">
              Next
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default StoreInfo;
