"use client";
import { useSignUpMutation } from "@/redux/services/authApi";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { failure, success } from "@/utils/notifications";
import Loader from "../global/Loader";
import { setRegistration } from "@/redux/features/registerationSlice";
import { useAppDispatch } from "@/redux/store";
import { Button, Label, TextInput } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { useForm } from 'react-hook-form';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Please enter your password."),
  confirmPassword: yup
    .mixed()
    .test("match", "Passwords must match.", function (value) {
      return value === this.parent.password;
    })
    .required("Please confirm your password."),
  name: yup
    .string()
    .required("Please enter your name.")
    .matches(/^[a-zA-Z ]*$/, "Only alphabets and spaces are allowed."),
  gender: yup.string().required("Please enter your gender."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Please enter your email."),
  // phone: yup.string().required("Please enter your phone number."),

  cnic: yup
    .string()
    .matches(
      /^[0-9]{13}$/,
      "CNIC must be 13 digits and contain only numeric values."
    )
    .required("Please enter your CNIC number."),
  // cnic: yup.string().matches(/^\d{13}$/, 'CNIC must be 13 digits.').required('Please enter your CNIC number.'),
  cnicFront: yup
    .mixed()
    .test(
      "fileType",
      " Only .png and .jpeg or .jpg are allowed.",
      (value: any | undefined) => {
        if (!value) return true; // Allow empty field
        return (
          value[0]?.type.includes("image/png") ||
          value[0]?.type.includes("image/jpeg") ||
          value[0]?.type.includes("image/jpg")
        );
      }
    )
    .test(
      "fileSize",
      "Image size should not exceed 2MB",
      (value: any | undefined) => {
        if (!value) return true; // Allow empty field
        return value[0]?.size <= 2 * 1024 * 1024; // 2MB in bytes
      }
    )
    .required("Please attach CNIC front image."),

  cnicBack: yup
    .mixed()
    .test(
      "fileType",
      " Only .png and .jpeg or .jpg are allowed.",
      (value: any | undefined) => {
        if (!value) return true; // Allow empty field
        return (
          value[0]?.type.includes("image/png") ||
          value[0]?.type.includes("image/jpeg") ||
          value[0]?.type.includes("image/jpg")
        );
      }
    )
    .test(
      "fileSize",
      "Image size should not exceed 2MB",
      (value: any | undefined) => {
        if (!value) return true; // Allow empty field
        return value[0]?.size <= 2 * 1024 * 1024; // 2MB in bytes
      }
    )
    .required("Please attach CNIC back image."),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});
const BasicInfo = ({ setActiveStep, setEmail }: any) => {
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  }: any = useForm({
    defaultValues: {
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
    },
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();

  const [signUp, { isSuccess, isLoading, isError, error }] =
    useSignUpMutation();

  const onSubmit = (data: any) => {
    data.phone = phone;
    const formData = new FormData();
    const token: any = searchParams.get("token");
    if (token) {
      formData.append("social[name]", "Google");
      formData.append("social[token]", token);
    }

    console.log(data, "data in parent");
    formData.append("name", data.name);
    formData.append("email", data.email);
    setEmail(data.email);
    formData.append("phone", data.phone);
    formData.append("step", "1");
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("cnic", data.cnic);
    formData.append("gender", data.gender);
    const cnicBackFileList = data.cnicBack;
    const cnicFrontFileList = data.cnicFront;
    const secondFile = cnicFrontFileList[0];
    const firstFile = cnicBackFileList[0];
    console.log("First File:", firstFile);
    formData.append("cnicImages", firstFile);
    formData.append("cnicImages", secondFile);

    signUp(formData)
      .unwrap()
      .then((res) => {
        console.log(res, "res");
        success("Step 1 completed successfully");
        setActiveStep(1);
        if (token) {
          formData.append("social[name]", "Google");
          formData.append("social[token]", token);
        }
        dispatch(
          setRegistration(
            token
              ? { ...getValues(), social: { name: "Google", token } }
              : getValues()
          )
        );
      })
      .catch((err) => {
        console.log(err, "err");
        failure(err?.data?.message || "An error occurred");
      });
  };

  console.log(errors, "gngodfnbv");
  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 lg:px-16 ml-[250px] mr-[250px]">
            <div>
              <Label className="mt-4" htmlFor="name">
                <span className="Text text-slate-500 text-sm font-medium font-['Inter']">
                  Full Name*
                </span>
              </Label>
              <input
                className="input-field"
                // className="ml-[54.5px] mt-2 w-[369px] h-[43px] pl-10 pr-8 py-3 rounded-[13px] shadow border-2 border-slate-500"
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Please enter your name.",
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm italic">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="email">
                <span className="Text text-slate-500 text-sm font-medium font-['Inter']">
                  Email*
                </span>
              </Label>
              <input
                className="input-field"
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Please enter your email.",
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm italic">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <Label className="mt-4" htmlFor="email">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Phone Number*
                </span>
              </Label>

              <PhoneInput
                onChange={handlePhoneChange}
                country={"pk"}
                countryCodeEditable={false}
                inputStyle={{ width: "100%", height: "43px" }}
              />
              {/* {errors.phone && (
                <span className="text-red-500 text-sm italic">
                  {errors.phone.message}
                </span>
              )} */}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="email">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Gender*
                </span>
              </Label>
              <select
                {...register("gender", {
                  required: "Please select the gender.",
                })}
                defaultValue={""}
                className="flex h-42 px-8 py-2 items-center gap-10 w-full self-stretch border rounded-md border-1 border-gray-300 bg-gray-50 text-slate-500"
              >
                <option value="" className="text-slate-500">
                  Select Gender
                </option>
                <option value="Male" className="text-slate-500">
                  Male
                </option>
                <option value="Female" className="text-slate-500">
                  Female
                </option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm italic">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <div>
              <Label className="mt-4" htmlFor="password">
                <span className="Text text-slate-500 text-md font-medium font-inter">
                  Password*
                </span>
              </Label>
              <div className="relative">
                <input
                  className="input-field"
                  // className="ml-[54.5px] mt-2 w-[369px] h-[43px] pl-10 pr-8 py-3 rounded-[13px] shadow border-2 border-slate-500"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Please enter your password.",
                  })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye className="text-slate-500" />
                  ) : (
                    <IoMdEyeOff className="text-slate-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm italic">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <Label className=" mt-4" htmlFor="confirmPassword">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  Confirm Password*
                </span>
              </Label>
              <div className="relative">
                <input
                  className="input-field"
                  // className="ml-[54.5px] mt-2 w-[369px] h-[43px] pl-10 pr-8 py-3 rounded-[13px] shadow border-2 border-slate-500"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please enter your password again.",
                  })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <IoMdEye className="text-slate-500" />
                  ) : (
                    <IoMdEyeOff className="text-slate-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm italic">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="col-span-2">
              <Label className="mt-4" htmlFor="phone">
                <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                  CNIC*
                </span>
              </Label>
              <input
                className="input-field"
                // className="ml-[54.5px] mt-2 w-[369px] h-[43px] pl-10 pr-8 py-3 rounded-[13px] shadow border-2 border-slate-500"
                id="cnic"
                type="text"
                placeholder="Enter your CNIC number"
                {...register("cnic", {
                  required: "Please enter your CNIC number",
                })}
              />
              {errors.cnic && (
                <span className="text-red-500 text-sm italic">
                  {errors.cnic.message}
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-slate-500 dark:text-white">
                CNIC (Front Side)*
              </label>
              <input
                className=" block w-full text-sm text-slate-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                // aria-describedby="file_input_help"
                // id="file_input"
                type="file"
                // multiple={false}
                {...register("cnicFront", {
                  required: "Please attach cnic image.",
                })}
              />
              {errors.cnicFront && (
                <span className="text-red-500 text-sm italic">
                  {errors.cnicFront.message}
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-slate-500 dark:text-white">
                CNIC (Back Side)*
              </label>
              <input
                className=" block w-full text-sm text-slate-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                // aria-describedby="file_input_help"
                // id="file_input"
                type="file"
                // multiple={false}
                {...register("cnicBack", {
                  required: "Please attach cnic image.",
                })}
              />
              {errors.cnicBack && (
                <span className="text-red-500 text-sm italic">
                  {errors.cnicBack.message}
                </span>
              )}
            </div>

            <div className="flex  col-span-2 items-center">
              <input
                {...register("terms", {
                  required: "accept terms and conditions",
                })}
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="whitespace-nowrap m-4 text-gray-500 text-sm font-bold font-['Inter']">
                By clicking ‘Create Account’, you’ve read and agreed to our
                Terms & Conditions and for my personal data to be processed
                according to <label className="text-black">ISMMART</label>{" "}
                Privacy Policy.
              </p>
            </div>
            {errors.terms && (
              <span className="text-red-500 text-sm italic">
                {errors.terms.message}
              </span>
            )}
            {/* <Button
              href="/signup"
              className="border-blue-500 text-blue-500"
              color="light"
            >
              Back
            </Button> */}
            <button type="submit" className="btn col-span-2">
              Create Account
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default BasicInfo;
