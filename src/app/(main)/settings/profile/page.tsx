"use client";
import React, { use, useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Select,
  TextInput,
  Label,
} from "flowbite-react";
import Modal from "@/components/global/Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetCurrentUserQuery,
  useProfileUpdateMutation,
} from "@/redux/services/authApi";
import Loader from "@/components/global/Loader";
import { ISettingsProfile } from "@/types/settingsTypes";
import Container from "@/components/global/Container";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SettingsProfilePage = () => {
  // db calls
  const {
    data: user,
    isLoading,
    refetch,
    isFetching,
  } = useGetCurrentUserQuery({});
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();

  // local state
  const [open, setOpen] = useState(false);

  // form handling
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ISettingsProfile>({
    values: {
      name: user?.data?.name,
      email: user?.data?.email,
      cnic: user?.data?.cnic,
      gender: user?.data?.gender,
      phone: user?.data?.phone,
    },
  });
  const onSubmit: SubmitHandler<ISettingsProfile> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "object" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    profileUpdate(formData);
    setOpen(false);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("image", e.target.files![0]);
    profileUpdate(formData);
  };
  if (isLoading || isUpdating) return <Loader />;
  return (
    <Container title="Profile">
      <main className="w-full">
        {user && (
          <>
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={user?.data?.image}
                  className="w-24 h-24 rounded-full"
                  alt="profile image"
                />
                <h3 className="text-[#3669C9] text-[1.25rem] font-[700]">
                  {user?.data?.name}
                </h3>
              </div>
              {/* image change */}
              <div className="flex gap-2">
                <>
                  <input
                    onChange={(e) => handleImageChange(e)}
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
            {/* handling modal edit */}
            <section className="flex items-center justify-between mt-[2.5rem]">
              <h1 className="text-[1.25rem] font-[600]">Profile Details</h1>
              <Button
                onClick={() => {
                  reset();
                  setOpen(true);
                }}
                color="blue"
              >
                Edit
              </Button>
            </section>
            {/* diabled form for showing profile data */}
            <form className="mt-[2.03rem] ml-[1rem]">
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Name</label>
                <FloatingLabel
                  variant="standard"
                  label={user?.data?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Email</label>
                <FloatingLabel
                  variant="standard"
                  label={user?.data?.email}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Phone</label>
                <FloatingLabel
                  variant="standard"
                  label={user?.data?.phone}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">Gender</label>
                <FloatingLabel
                  variant="standard"
                  label={user?.data?.gender}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[1.25rem] font-[600]">CNIC</label>
                <FloatingLabel
                  variant="standard"
                  label={user?.data?.cnic}
                  disabled={true}
                />
              </div>
              {/* <div className="flex flex-col">
              <label className="text-[1.25rem] font-[600]">{}</label>
              <img
                src="/assets/dummyCnic.png"
                className="w-[19rem] h-[12rem] mt-2"
              />
            </div> */}
            </form>
            {/* modal for edit profile */}
            <Modal open={open} setOpen={setOpen} title="Edit Profile">
              {isFetching ? (
                <Loader />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem]"
                >
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="name"
                        value="Name*"
                      />
                    </div>
                    <TextInput
                      id="title"
                      // defaultValue={user?.data?.name}
                      {...register("name", {
                        required: "This field is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/i,
                          message: "Only letters and space is allowed",
                        },
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="email"
                        value="Email*"
                      />
                    </div>
                    <TextInput
                      id="title"
                      // defaultValue={user?.data?.email}
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full  ">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          inputStyle={{
                            height: "42px",
                            padding: "8px 45px",
                            width: "100%",
                          }}
                          inputClass={`input-field  w-full`}
                          // value={user?.data?.phone}
                          country={"pk"}
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          // countryCodeEditable={false}
                        />
                      )}
                    />
                    {errors?.phone && (
                      <p className="text-red-500">{errors?.phone.message}</p>
                    )}
                  </div>
                  {/* <div>
                  <div className="mb-2 block">
                    <Label
                      className="text-[#6B7280]"
                      htmlFor="phone"
                      value="Phone*"
                    />
                  </div>
                  <TextInput
                    id="phone"
                    // defaultValue={user?.data?.phone}
                    {...register("phone", {
                      required: "This field is required",
                      pattern: {
                        value: /^[0-9]+$/i,
                        message: "Only numbers are allowed",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="text-red-500">{errors.phone.message}</span>
                  )}
                </div> */}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-[#6B7280]"
                        htmlFor="gender"
                        value="Gender*"
                      />
                    </div>
                    <Select
                      // defaultValue={user?.data?.gender}
                      {...register("gender", { required: true })}
                      id="gender"
                      required
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </Select>
                    {errors.gender && (
                      <span className="text-red-500">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    <div>
                      <div className="mb-2 block">
                        <Label
                          className="text-[#6B7280]"
                          htmlFor="cnic"
                          value="CNIC*"
                        />
                      </div>
                      <TextInput
                        id="cnic"
                        // defaultValue={user?.data?.cnic}
                        {...register("cnic", {
                          required: "This field is required",
                          pattern: {
                            value: /^[0-9]+$/i,
                            message: "Please numbers are allowed",
                          },
                          maxLength: {
                            value: 13,
                            message: "CNIC must be 13 digits",
                          },
                        })}
                      />
                      {errors.cnic && (
                        <span className="text-red-500">
                          {errors.cnic.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="cnic-front" value="CNIC (Front Side)" />
                </div>
                <FileInput id="cnic-front" color="info" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cnic-back" value="CNIC (Back Side)" />
                </div>
                <FileInput id="cnic-back" color="info" />
              </div> */}

                  <div className="lg:col-span-2 flex justify-end gap-[1rem]">
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
export default SettingsProfilePage;
