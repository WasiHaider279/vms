import { useSignUpMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../global/Loader";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { setRegistration } from "@/redux/features/registerationSlice";
import { useAppDispatch } from "@/redux/store";
import { MdDelete } from "react-icons/md";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface BankDetailsFormData {
  banks: {
    title: string;
    name: string;
    accountNumber: string;
    iban: string;
  }[];
}
const schema = yup.object().shape({
  banks: yup.array().of(
    yup.object().shape({
      title: yup
        .string()
        .matches(
          /^[a-zA-Z\s]+$/,
          "Account title can only contain alphabets and spaces"
        )
        .required("Account title is required"),
      name: yup
        .string()
        .matches(
          /^[a-zA-Z\s]+$/,
          "Bank name can only contain alphabets and spaces"
        )
        .required("Bank name is required"),
      accountNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Account number can only contain numeric digits")
        .required("Account number is required"),
      iban: yup
        .string()
        .matches(
          /^[A-Z0-9]+$/,
          "IBAN can only contain alphanumeric uppercase characters"
        )
        .required("IBAN is required"),
    })
  ),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});

const BankDetails = ({ stores, setActiveStep }: any) => {
  const dispatch = useAppDispatch();
  console.log(stores, "stores");
  const { data: step2 } = useSelector(
    (state: any) => state.registerationReducer
  );
  const router = useRouter();
  const [signUp, { isSuccess, isLoading, isError, error }] =
    useSignUpMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      banks: [
        {
          title: "",
          name: "",
          accountNumber: "",
          iban: "",
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "banks",
  });

  const onSubmit = (data: any) => {
    console.log("formData", data);
    let formData = new FormData();

    data.banks.forEach((bank: any, index: any) => {
      formData.append(`banks[${index}][title]`, bank.title);
      formData.append(`banks[${index}][name]`, bank.name);
      formData.append(`banks[${index}][accountNumber]`, bank.accountNumber);
      formData.append(`banks[${index}][iban]`, bank.iban);
    });

    const newData = { ...step2, step: "4", formData };
    console.log(newData);
    stores?.forEach((id: any, index: any) => {
      if (id !== null) {
        formData.append("storeTypes[]", id);
      }
    });
    Object.entries(newData)?.forEach(([key, value]: any) => {
      if (key === "storeImage") {
        formData.append(key, value[0]);
        return;
      }
      if (key === "cnicBack" || key === "cnicFront") {
        const file = value[0];
        formData.append("cnicImages", file);
        return;
      }
      formData.append(key, value);
    });
    for (let key of formData.keys()) {
      console.log(key + ", " + formData.get(key));
    }

    signUp(formData)
      .unwrap()
      .then((res) => {
        console.log(res, "res");
        success("Registration successfull");
        setActiveStep(3);
        dispatch(setRegistration(getValues()));
      })
      .catch((err) => {
        console.log(err, "err");
        // failure(`${error?.data?.message.map((msg: string) => `\n${msg}`)}`);
        failure(err?.data?.message || "An error occurred");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex flex-col gap-8">
              {fields.map((bank, index) => {
                return (
                  <div
                    className="grid grid-cols-2 text-centre ml-[120px] mr-[120px] pl-[250px] pr-[250px] gap-x-8 gap-2"
                    key={bank.id}
                  >
                    <div>
                      <Label
                        className=" mt-4"
                        htmlFor={`banks[${index}].title`}
                      >
                        <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                          Account Title*
                        </span>
                      </Label>
                      <input
                        className="input-field"
                        {...register(`banks.${index}.title` as const, {
                          required: true,
                        })}
                        placeholder="John Smith"
                      />
                      {errors?.banks?.[index]?.title && (
                        <p className="text-red-500 italic">
                          {errors?.banks?.[index]?.title?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className=" mt-4" htmlFor={`banks[${index}].name`}>
                        <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                          Bank Name*
                        </span>
                      </Label>
                      <input
                        className="input-field"
                        {...register(`banks.${index}.name` as const, {
                          required: true,
                        })}
                        placeholder="ABC Bank"
                      />
                      {errors?.banks?.[index]?.name && (
                        <p className="text-red-500 italic">
                          {errors?.banks?.[index]?.name?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        className=" mt-4"
                        htmlFor={`banks[${index}].accountNumber`}
                      >
                        <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                          Account Number*
                        </span>
                      </Label>
                      <input
                        className="input-field"
                        {...register(`banks.${index}.accountNumber` as const, {
                          required: true,
                        })}
                        placeholder="1234567890"
                      />
                      {errors?.banks?.[index]?.accountNumber && (
                        <p className="text-red-500 italic">
                          {errors?.banks?.[index]?.accountNumber?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className=" mt-4" htmlFor={`banks[${index}].iban`}>
                        <span className="Text text-slate-500 text-md font-medium font-['Inter']">
                          IBAN*
                        </span>
                      </Label>
                      <input
                        className="input-field"
                        {...register(`banks.${index}.iban` as const, {
                          required: true,
                        })}
                        placeholder="PK1234567890"
                      />
                      {errors?.banks?.[index]?.iban && (
                        <p className="text-red-500 italic">
                          {errors?.banks?.[index]?.iban?.message}
                        </p>
                      )}
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => remove(index)}
                      >
                        <MdDelete className="text-4xl" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="ml-[370px] mt-[20px] btn"
              onClick={() =>
                append({ title: "", name: "", accountNumber: "", iban: "" })
              }
            >
              Add Multiple Banks
            </button>
            <div className="flex flex-col ml-[370px] mt-[20px]">
              <div className="flex items-center">
                <input
                  {...register("terms", {
                    required: "accept terms and conditions",
                  })}
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="whitespace-nowrap m-4 text-slate-500 text-md font-bold font-['Inter']">
                  By clicking ‘Create Account’, you’ve read and agreed to our
                  Terms & Conditions and for my personal data to be processed
                  according
                  <br /> to ISMMART Privacy Policy.
                </p>
              </div>
              {errors.terms && (
                <span className="text-red-500 text-sm italic mb-4">
                  {errors.terms.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 text-centre ml-[120px] mr-[120px] pl-[250px] pr-[250px] gap-8">
              <Button
                onClick={() => setActiveStep(1)}
                style={{ borderColor: "blue" }}
                className="!border !border-primary hover:text-primary"
                color="light"
              >
                Back
              </Button>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BankDetails;
