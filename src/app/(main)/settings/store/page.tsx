"use client";
import React, { useState } from "react";
import { Button, FloatingLabel, TextInput, Label } from "flowbite-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetCurrentUserQuery,
  useProfileUpdateMutation,
} from "@/redux/services/authApi";
import { useGetStoreTypesQuery } from "@/redux/services/common/storeType";
import { ISettingsStore } from "@/types/settingsTypes";
import Modal from "@/components/global/Modal";
import Loader from "@/components/global/Loader";
import Container from "@/components/global/Container";
import Multiselect from "multiselect-react-dropdown";
import { failure } from "@/utils/notifications";

const SettingsPage = () => {
  // db calls
  const { data: user, isLoading, isFetching } = useGetCurrentUserQuery({});
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();
  const { data: storeTypes } = useGetStoreTypesQuery({});

  // local state
  const [open, setOpen] = useState(false);

  // types of store
  var arrayOfTypes: string[] = [];
  var selectedTypes: any[] = [];
  if (user) {
    arrayOfTypes = user?.data?.store?.types?.map(
      (obj: { name: string }) => obj.name
    );
    selectedTypes = user?.data?.store?.types;
  }

  // form handling
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISettingsStore>({
    values: {
      storeTypes:
        user?.data?.store?.types?.map((obj: { _id: string }) => obj._id) || [],
      storeName: user?.data?.store?.name || "",
      storeSlug: user?.data?.store?.slug || "",
    },
  });
  const onSubmit: SubmitHandler<ISettingsStore> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "object" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    selectedTypes.forEach((type, index) => {
      formData.append(`storeTypes[${index}]`, type._id);
    });
    profileUpdate(formData);
    setOpen(false);
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];

    // Check if a file is selected
    if (selectedFile) {
      // Check if the file size is less than or equal to 2MB (2 * 1024 * 1024 bytes)
      if (selectedFile.size <= 2 * 1024 * 1024) {
        const formData = new FormData();
        formData.append("storeImage", selectedFile);

        // Call your profileUpdate function with the formData
        profileUpdate(formData);
      } else {
        console.log("error");
        // Display an error message or handle the oversized file appropriately
        failure("File size exceeds the limit of 2MB");
      }
    }
  };

  if (isLoading || isUpdating) return <Loader />;
  return (
    <Container title="Store">
      <main className="w-full">
        {user && (
          <>
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={user?.data?.store?.logo}
                  className="w-24 h-24 rounded-full"
                  alt="logo"
                />
                <h3 className="text-[#3669C9] text-[1.25rem] font-[700]">
                  {user?.data?.store?.name}
                </h3>
              </div>
              {/* logo change */}
              <div className="flex gap-2">
                <>
                  <input
                    onChange={(e) => handleLogoChange(e)}
                    type="file"
                    id="upload"
                    hidden
                  />
                  <label
                    htmlFor="upload"
                    className="inline-block bg-blue-700 text-white px-3 py-2 rounded-lg cursor-pointer"
                  >
                    Upload New Photo
                  </label>
                </>

                <button className="text-[#FE3A30] bg-white border-2 border-[#FE3A30] px-3 rounded-lg">
                  Delete
                </button>
              </div>
            </section>
            {/* edit utton for modal */}
            <section className="flex items-center justify-between mt-[2.03rem]">
              <h1 className="text-[1.25rem] font-[600]">Store Details</h1>
              <Button
                color="blue"
                onClick={() => {
                  reset();
                  setOpen(true);
                }}
              >
                Edit
              </Button>
            </section>
            {/* diabaled form for showing data */}
            <form className="mt-[2.03rem] ml-[1rem]">
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Name</label>
                <FloatingLabel
                  variant="standard"
                  label=""
                  value={user?.data?.store?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Slug</label>
                <FloatingLabel
                  variant="standard"
                  label=""
                  value={user?.data?.store?.slug}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Types</label>
                <FloatingLabel
                  variant="standard"
                  label=""
                  value={arrayOfTypes.length > 0 ? arrayOfTypes.join(", ") : ""}
                  disabled={true}
                />
              </div>
            </form>
            {/* modal for edit */}
            <Modal open={open} setOpen={setOpen} title="Edit Store">
              {isFetching ? (
                <Loader />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] h-max overflow-y-auto"
                >
                  {/* store name  */}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="storeName"
                        value="Store Name *"
                      />
                    </div>
                    <TextInput
                      id="storeName"
                      // defaultValue={user?.data?.store?.name}
                      {...register("storeName", {
                        required: "This field is required",
                        pattern: {
                          value: /^^[a-zA-Z0-9\s]+$/i,
                          message: "Only letters, numbers and space is allowed",
                        },
                      })}
                    />
                    {errors.storeName && (
                      <span className="text-red-500">
                        {errors.storeName.message}
                      </span>
                    )}
                  </div>
                  {/* store slug */}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="storeSlug"
                        value="Store Slug *"
                      />
                    </div>
                    <TextInput
                      id="storeSlug"
                      // defaultValue={user?.data?.store?.slug}
                      {...register("storeSlug", {
                        required: "This field is required",
                        pattern: {
                          value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                          message:
                            "Only lowercase letters and hyphen is allowed",
                        },
                      })}
                    />
                    {errors.storeSlug && (
                      <span className="text-red-500">
                        {errors.storeSlug.message}
                      </span>
                    )}
                  </div>
                  {/* store types */}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="storeTypes"
                        value="Store Types (atleast 1) *"
                      />
                    </div>
                    <Multiselect
                      options={storeTypes?.data?.items}
                      selectedValues={user?.data?.store?.types}
                      onSelect={(selectedList, selectedItem) => {
                        selectedTypes = selectedList;
                      }}
                      onRemove={(selectedList, removedItem) => {
                        console.log(selectedList);
                        if (selectedTypes.length > 1) {
                          selectedTypes = selectedList;
                        }
                      }}
                      displayValue="name"
                      placeholder="Select Store Types"
                      id="storeTypes"
                      style={{
                        chips: {
                          background: "green",
                        },
                        multiselectContainer: {
                          color: "black",
                        },
                        searchBox: {
                          border: "none",
                          borderBottom: "1px solid blue",
                          borderRadius: "0px",
                        },
                      }}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end gap-[1rem]">
                    <Button color="blue" outline onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" color="blue">
                      Save
                    </Button>
                  </div>
                </form>
              )}
            </Modal>
          </>
        )}
      </main>
    </Container>
  );
};

export default SettingsPage;
