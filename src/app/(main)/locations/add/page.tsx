"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import Container from "@/components/global/Container";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "@/redux/services/placesApi";
import Loader from "@/components/global/Loader";
import { useAddLocationMutation } from "@/redux/services/locationApi";
import { failure, success } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationValidationSchema } from "@/utils/validations";
import { useRouter } from "next/navigation";

const AddLocation: React.FC = () => {
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(locationValidationSchema),
  });

  const { data: countryData, isLoading } = useGetCountriesQuery({
    limit: 0,
    "sort[name]": 1,
  });

  const { data: cityData, isFetching } = useGetCitiesQuery(
    {
      country: watch("country"),
      limit: 0,
      "sort[name]": 1,
    },
    { skip }
  );

  useEffect(() => {
    if (watch("country")) {
      setSkip(false);
    }
  }, [watch("country")]);

  const [AddLocation, { isLoading: addLocationLoading }] =
    useAddLocationMutation();

  const onSubmit = (data: object) => {
    console.log(data);
    AddLocation(data)
      .unwrap()
      .then((res) => {
        console.log(res, "success res");
        success(res?.message);
        setTimeout(() => {
          router.push("/locations");
        }, 2000);
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  if (isLoading) return <Loader />;
  return (
    <Container title="Create Location">
      <p className="w-full text-slate-700 text-[19px] font-medium">
        Location Details
      </p>
      <hr className="w-full text-black h-2 -p-2"></hr>
      {addLocationLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 w-3/4">
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm mb-2 font-medium"
              htmlFor="name"
            >
              Name*
            </label>
            <input
              placeholder="e.g. Beverly Center Islamabad"
              {...register("name", { required: "This field is required" })}
              className="shadow appearance-none bg-gray-50 border rounded-lg w-full border-gray-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
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
                {...register("country", { required: "This field is required" })}
                className="bg-gray-50 shadow appearance-none border-gray-300 border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={""}>Choose Country</option>
                {countryData?.data?.items?.map((country: any) => (
                  <option key={country} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
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
                className="bg-gray-50 shadow appearance-none border-gray-300 border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={""}>Select city</option>
                {isFetching ? (
                  <option value={""}>Loading</option>
                ) : (
                  cityData?.data?.items.map((city: any) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))
                )}
              </select>
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
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
              placeholder="Enter your address"
              {...register("address", { required: "This field is required" })}
              className="bg-gray-50 border-gray-300 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
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
                className="bg-gray-50 shadow appearance-none border-gray-300 border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" selected disabled>
                  Choose Status
                </option>
                <option value={"Active"}>Active</option>
                <option value={"In-Active"}>Inactive</option>
              </select>

              {errors.status && (
                <span className="text-red-500">{errors.status.message}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => {
                router.push("/locations");
              }}
              type="button"
              className="bg-slate-100 text-[#3669C9] border-[#3669C9] border  font-semibold py-1 text-sm  px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#3669C9] text-gray-100 text-sm border-blue-600 border  font-semibold py-1  px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Save & Create
            </button>
          </div>
        </form>
      )}
    </Container>
  );
};

export default AddLocation;
