"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import Container from "@/components/global/Container";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "@/redux/services/placesApi";
import Loader from "@/components/global/Loader";
import {
  useAddLocationMutation,
  useGetLocationsQuery,
  useUpdateLocationMutation,
} from "@/redux/services/locationApi";
import { failure, success } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationValidationSchema } from "@/utils/validations";
import { useParams, useRouter } from "next/navigation";

type LocationsFormData = {
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  status: "Active" | "In-Active";
};

const EditLocation: React.FC = () => {
  const router = useRouter();
  const locationID = useParams();

  const { data, isLoading: locationLoading } = useGetLocationsQuery({
    id: locationID.id,
    limit: 1,
  });

  const locationData = locationLoading ? "" : data?.data?.items[0];

  const [skip, setSkip] = useState(true);
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      name: locationData?.name,
      country: locationData?.country?._id,
      city: locationData?.city?._id,
      address: locationData?.address,
      phone: locationData?.phone,
      status: locationData?.status,
    },
  });

  const { data: countryData, isLoading } = useGetCountriesQuery({
    limit: 0,
    "sort[name]": 1,
  });

  const {
    data: cityData,
    isFetching,
    isLoading: cityLoading,
  } = useGetCitiesQuery({
    country: watch("country"),
    limit: 0,
    "sort[name]": 1,
  });

  useEffect(() => {
    if (watch("country")) {
      setSkip(false);
    }
  }, [watch("country")]);

  const [updateLocation, { isLoading: addLocationLoading }] =
    useUpdateLocationMutation();

  const onSubmit = (data: object) => {
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (value?.length >= 1) {
    //     formData.append(key, value);
    //   }
    // });
    updateLocation({ payload: data, id: locationID.id })
      .unwrap()
      .then((res) => {
        success(res?.message);
        router.push("/locations");
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  if (isLoading || locationLoading || cityLoading) return <Loader />;
  return (
    <Container title="Edit Location">
      <p className="w-full text-slate-700 text-[19px] font-medium">
        Location Details
      </p>
      <hr className="w-full text-black h-2 -p-2"></hr>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 w-3/4">
        <div className="mb-4">
          <label
            className="block text-gray-500 text-sm mb-2 font-medium"
            htmlFor="name"
          >
            Name*
          </label>
          <input
            id="name"
            {...register("name", { required: "This field is required" })}
            className="shadow appearance-none bg-gray-50 border rounded w-full border-gray-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex w-full gap-4">
          <div className="mb-4 w-1/2">
            <label
              className="block text-gray-500 text-sm font-medium mb-2"
              htmlFor="country"
            >
              Country*
            </label>
            <select
              id="country"
              {...register("country", { required: "This field is required" })}
              className="bg-gray-50 shadow appearance-none border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={""}>Choose Country</option>
              {countryData?.data?.items?.map((country: any, index: any) => (
                <option key={index} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-1/2">
            <label
              className="block text-gray-500 text-sm font-medium mb-2"
              htmlFor="city"
            >
              City*
            </label>
            <select
              {...register("city", { required: "This field is required" })}
              id="city"
              defaultValue={"Select"}
              className="bg-gray-50 shadow appearance-none border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={""}>Select city</option>

              {isFetching ? (
                <option value={""}>Loading cities...</option>
              ) : (
                cityData?.data?.items.map((city: any, index: any) => (
                  <option key={index} value={city._id}>
                    {city.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-500 text-sm font-medium mb-2"
            htmlFor="address"
          >
            Address*
          </label>
          <textarea
            id="address"
            placeholder="Enter your address"
            {...register("address", { required: "This field is required" })}
            className="bg-gray-50 border-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 w-full">
          <div className="w-1/2 gap-4">
            <label
              className="block text-gray-500 text-sm font-medium mb-2"
              htmlFor="status"
            >
              Status*
            </label>
            <select
              {...register("status", { required: "This field is required" })}
              id="status"
              defaultValue={"Choose Status"}
              className="bg-gray-50 shadow appearance-none border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Choose Status
              </option>
              <option value={"Active"}>Active</option>
              <option value={"In-Active"}>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => {
              router.push("/locations");
            }}
            className="bg-slate-100 text-[#3669C9] border-[#3669C9] border  font-semibold py-1 text-sm  px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#3669C9] text-gray-100 text-sm border-blue-600 border  font-semibold py-1  px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Location
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EditLocation;
