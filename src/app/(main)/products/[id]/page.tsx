"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/AddProduct/InputField";
import { IFormInputs, IProductData } from "@/types/productTypes";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ImageField from "@/components/AddProduct/ImageField";
import AddVariants from "@/components/global/AddVariants";
import CheckField from "@/components/AddProduct/CheckField";
import DropDownField from "@/components/AddProduct/DropDownField";
import Loader from "@/components/global/Loader";
import {
  useAddProductMutation,
  useGetProductCategoriesQuery,
  useGetProductTypeQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/services/productApi";
import { failure, success } from "@/utils/notifications";
import TextAreaField from "@/components/AddProduct/TextAreaField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  editProductValidationSchema,
  productValidationSchema,
} from "@/utils/validations";
import ImageUploadForm from "@/components/AddProduct/ImageUploadForm";
import { useGetLocationsQuery } from "@/redux/services/locationApi";
import EditVariants from "@/components/global/EditVariants";
import InputFormField from "@/components/AddProduct/InputFormField";
import MultipleDropDownField from "@/components/AddProduct/MultipleDropDownField";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery({
      limit: 30,
    });
  const { data: typesData, isLoading: typesLoading } = useGetProductTypeQuery({
    limit: 30,
  });
  const { data, isLoading: productLoading } = useGetProductsQuery({
    id: id,
    limit: 1,
  });
  const [updateProduct, { isLoading: isUploading }] =
    useUpdateProductMutation();

  const productData = productLoading ? "" : data?.data?.items[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    values: {
      name: productData && productData.name ? productData.name : "",
      productCategory:
        productData && productData.categories[0]?._id
          ? productData.categories[0]._id
          : "",
      productType:
        productData && productData.type?._id ? productData.type._id : "",
      description:
        productData && productData.description ? productData.description : "",
      images: productData && productData.media ? productData.media : "",
      tags: productData && productData.tags ? productData.tags : "",
    },
    resolver: yupResolver(editProductValidationSchema),
  });

  const {
    data: locationData,
    isFetching,
    isLoading,
  } = useGetLocationsQuery({ limit: "full" });

  const router = useRouter();

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

  const onSubmit = (data: any) => {
    const variants: any = [];
    const inventory: any = [];

    data.combinations?.forEach((item: any) => {
      const { variantId, _id, dimensions, weight, options } = item;
      if (variantId !== undefined) {
        variants.push({ variantId, dimensions, weight, options });
      } else {
        variants.push({ _id, dimensions, weight, options });
      }

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
      // options: [{ name: "Color", values: ["Yellow"] }],
      // variants: [
      //   {
      //     variantId: "32984hyfe",
      //     options: ["Red"],
      //     dimensions: [
      //       {
      //         width: 10,
      //         height: 10,
      //         length: 10,
      //       },
      //     ],
      //   },
      // ],
      media: data.images,
      tags: data.tags,
    };

    const formDataToSend: FormData = convertObjectToFormData(newData);

    updateProduct({ payload: formDataToSend, id: id })
      .unwrap()
      .then((res: any) => {
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

  if (productLoading) return <Loader />;

  return (
    <form className="space-y-2 w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between mb-5">
        <h1 className=" text-neutral-900 text-2xl font-bold font-inter leading-9 mb-4">
          Edit Product
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
            <div className="flex text-center gap-2 text-white text-xs font-bold font-inter leading-[18px]">
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
              <div className="w-full ">
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

              <div className="w-full ">
                <TextAreaField
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Write product description here"
                  fieldRequired={false}
                  errors={errors}
                />
              </div>

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

              <div className="w-full ">
                <h2 className="self-stretch text-zinc-800 text-sm font-bold font-inter">
                  Variants
                </h2>
                <div className="w-full h-max bg-white p-4 rounded-lg my-3">
                  <EditVariants
                    register={register}
                    setValue={setValue}
                    data={locationData?.data?.items}
                    variantsData={productData?.options}
                    combinationData={productData?.variants}
                  />
                </div>
              </div>

              <div className="w-full bg-white p-4 rounded-lg">
                <h2 className="text-gray-900 text-sm font-medium font-inter leading-[21px]">
                  Shipping
                </h2>
                <CheckField
                  register={register}
                  label=" This is a physical product"
                  type="checkbox"
                  name="shippingProduct"
                />
                <div className="my-3">
                  <InputField
                    register={register}
                    label="Weight"
                    name="weight"
                    type="text"
                    placeholder="0.0"
                    fieldRequired={false}
                    errors={errors}
                  />
                </div>

                <hr className="border"></hr>

                <div className="grid grid-cols-2 gap-4 my-3">
                  <InputField
                    register={register}
                    label="Country/Region of origin"
                    name="origin"
                    type="text"
                    placeholder="Pakistan"
                    fieldRequired={false}
                    errors={errors}
                  />
                  <InputField
                    register={register}
                    label="Harmonized System (HS) code"
                    name="status"
                    type="text"
                    placeholder="Search by product keyword or code"
                    fieldRequired={false}
                    errors={errors}
                  />
                </div>
                <CheckField
                  register={register}
                  label="Continue selling when out of stock"
                  type="checkbox"
                  name="shippingProduct"
                />
                <CheckField
                  register={register}
                  label="This product has a SKU or barcode"
                  type="checkbox"
                  name="shippingProduct"
                />
              </div>
            </div>
            <div className="w-full md:w-2/6">
              <div className="w-full bg-white p-5 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
                <div className="">
                  <h2 className="pt-2 text-gray-900 text-sm font-medium ">
                    Publishing
                  </h2>
                  <div className="my-3">
                    <p className="pt-2 text-neutral-500 text-xs font-normal">
                      Sales channels
                    </p>
                    <CheckField
                      register={register}
                      label="Online Store"
                      type="checkbox"
                      name="onlineStore"
                    />
                    <CheckField
                      register={register}
                      label="Facebook & Instagram"
                      type="checkbox"
                      name="socialMedia"
                    />
                    <CheckField
                      register={register}
                      label="Europe, International, and Pakistan"
                      type="checkbox"
                      name="countryChannel"
                    />
                  </div>
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
                      watch={watch}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      isLoading={categoriesLoading}
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
                      watch={watch}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      isLoading={typesLoading}
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

export default ProductDetails;
