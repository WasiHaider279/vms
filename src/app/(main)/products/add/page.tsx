"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/global/Container";
import { useForm } from "react-hook-form";
import AddVariants from "@/components/global/AddVariants";
import { IFormInputs } from "@/types/productTypes";
import InputField from "@/components/AddProduct/InputField";
import CheckField from "@/components/AddProduct/CheckField";
import ImageField from "@/components/AddProduct/ImageField";
import {
  useAddProductMutation,
  useGetProductCategoriesQuery,
  useGetProductTypeQuery,
} from "@/redux/services/productApi";
import MultipleField from "@/components/AddProduct/MultipleField";
import Loader from "@/components/global/Loader";
import { failure, success } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import DropDownField from "@/components/AddProduct/DropDownField";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "@/utils/validations";
import TextAreaField from "@/components/AddProduct/TextAreaField";
import ImageUploadForm from "@/components/AddProduct/ImageUploadForm";
import { useGetLocationsQuery } from "@/redux/services/locationApi";
import InputFormField from "@/components/AddProduct/InputFormField";
import MultipleDropDownField from "@/components/AddProduct/MultipleDropDownField";
import ToggleField from "@/components/AddProduct/ToggleField";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(productValidationSchema),
  });

  const router = useRouter();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery({
      limit: 30,
    });
  const { data: typesData, isLoading: typesLoading } = useGetProductTypeQuery({
    limit: 30,
  });
  const {
    data: locationData,
    isFetching,
    isLoading,
  } = useGetLocationsQuery({ limit: "full" });
  const [addProduct, { isLoading: isUploading }] = useAddProductMutation();

  const convertObjectToFormData = (
    obj: any,
    form?: FormData,
    namespace?: string
  ): FormData => {
    const formData = form || new FormData();

    for (const key in obj) {
      if (
        !Object.prototype.hasOwnProperty.call(obj, key) ||
        obj[key] === undefined
      )
        continue;

      const formKey = namespace ? `${namespace}[${key}]` : key;

      if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any, index: any) => {
          if (
            typeof item === "object" &&
            item !== null &&
            !(item instanceof File)
          ) {
            convertObjectToFormData(item, formData, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item);
          }
        });
      } else if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !(obj[key] instanceof File)
      ) {
        convertObjectToFormData(obj[key], formData, formKey);
      } else {
        formData.append(formKey, obj[key]);
      }
    }

    return formData;
  };

  // jump to error field
  const scrollToError = (fieldName: any) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const onSubmit = (data: any) => {
    const variants: any = [];
    const inventory: any = [];

    data.combinations.forEach((item: any) => {
      const { variantId, dimensions, weight, options } = item;
      variants.push({ variantId, dimensions, weight, options });

      const inventoryItems = item.inventory.map((inventoryItem: any) => {
        const { sku, barcode, price, quantity, variant, location } =
          inventoryItem;
        if (
          sku !== "" &&
          barcode !== "" &&
          price !== "" &&
          quantity !== "" &&
          variant !== "" &&
          location !== ""
        ) {
          return {
            sku,
            barcode,
            price,
            quantity,
            variant,
            location,
          };
        }

        return null;
      });

      inventory.push(...inventoryItems.filter((item: any) => item !== null));
    });

    const newData = {
      name: data.name,
      description: data.description,
      categories: [data.productCategory],
      type: data.productType,
      options: data.variants,
      variants: variants,
      inventory: inventory,
      media: data.images,
      tags: data.tags,
      active: data.active,
      physical: data.physical,
    };

    const formDataToSend: FormData = convertObjectToFormData(newData);
    addProduct(formDataToSend)
      .unwrap()
      .then((res) => {
        success(res.message);
        router.push("/products");
      })
      .catch((err) => {
        if (err.status === 422) {
          failure(err?.data?.message[0] || "Validation Error");
        } else {
          failure(err?.data?.message || "Server Error");
        }
      });
  };

  useEffect(() => {
    // Scroll to the first field with an error
    if (errors) {
      const errorField = Object.keys(errors)[0];
      if (errorField) {
        scrollToError(errorField);
      }
    }
  }, [errors]);

  return (
    <form className="space-y-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between mb-5">
        <h1 className=" text-neutral-900 text-2xl font-bold font-inter leading-9 mb-4">
          Add Product
        </h1>

        <div className="flex gap-2">
          <button
            type="submit"
            className="h-[34px] px-6 py-2 bg-slate-400 rounded-lg justify-center items-center gap-2 inline-flex cursor-not-allowed"
            disabled={true}
          >
            <div className="flex text-center gap-2 text-white text-xs font-bold font-inter leading-[18px]">
              Save as draft
            </div>
          </button>

          <button
            type="submit"
            className="h-[34px] px-6 py-2 bg-primary rounded-lg justify-center items-center gap-2 inline-flex"
            disabled={isUploading}
          >
            <div className="flex text-center  gap-2 text-white text-xs font-bold font-inter leading-[18px]">
              Save
              {isUploading && <Loader h="20px" w="20px" />}
            </div>
          </button>
        </div>
      </div>
      <div>
        <div className="space-y-2 w-full">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="w-full md:w-4/6 flex-col justify-start items-start gap-4 inline-flex">
              <div className="w-full">
                <InputFormField
                  register={register}
                  label="Title"
                  name="name"
                  type="text"
                  placeholder="3GM WOMEN T-SHIRT NAVY BLUE"
                  fieldRequired={true}
                  errors={errors}
                />
              </div>

              <div className="w-full">
                <TextAreaField
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Write product description here..."
                  fieldRequired={true}
                  errors={errors}
                />
              </div>
              {/* Images */}
              <div className="w-full">
                <ImageUploadForm
                  label="Images"
                  name="images"
                  type="file"
                  placeholder="Images"
                  fieldRequired={true}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  clearErrors={clearErrors}
                />
              </div>

              <div className="w-full">
                <h2 className="self-stretch text-zinc-800 text-sm font-medium font-inter">
                  Variants
                </h2>
                {/* className="w-full h-max bg-white p-4 rounded-lg my-3" */}
                <div>
                  <AddVariants
                    register={register}
                    setValue={setValue}
                    data={locationData?.data?.items}
                  />
                </div>
              </div>

              <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                <h2 className="self-stretch text-zinc-800 text-sm font-medium font-inter">
                  Shipping
                </h2>
                <div className="w-full bg-white p-4 rounded-lg">
                  <CheckField
                    register={register}
                    label=" This is a physical product"
                    type="checkbox"
                    name="physical"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/6">
              <div className="w-full bg-white p-5 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
                <div className="w-full">
                  <ToggleField
                    register={register}
                    type="checkbox"
                    name="active"
                    watch={watch}
                  />
                </div>

                <div className="w-full">
                  <h2 className="pt-2 text-gray-900 text-sm font-medium ">
                    Product Organization
                  </h2>
                  <div className="w-full flex-col gap-5 inline-flex my-3">
                    <DropDownField
                      register={register}
                      label="Product Category"
                      name="productCategory"
                      type="text"
                      placeholder="Choose the Product Category"
                      fieldRequired={true}
                      data={categoriesData?.data?.items}
                      errors={errors}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      isLoading={categoriesLoading}
                      watch={watch}
                    />

                    <DropDownField
                      register={register}
                      label="Product Type"
                      name="productType"
                      type="text"
                      placeholder="Choose the Product Type"
                      fieldRequired={true}
                      data={typesData?.data?.items}
                      errors={errors}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      isLoading={typesLoading}
                      watch={watch}
                    />

                    <MultipleDropDownField
                      register={register}
                      label="Tags"
                      name="tags"
                      type="text"
                      placeholder="Select..."
                      fieldRequired={true}
                      data={categoriesData?.data?.items}
                      errors={errors}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      isLoading={typesLoading}
                      watch={watch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
