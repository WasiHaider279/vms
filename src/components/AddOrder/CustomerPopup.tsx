import { IFormData } from "@/types/productTypes";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  setOpen: Function;
  getData: Function;
};

const YourFormComponent = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const { setOpen, getData } = props;
  const onSubmit = (data: object) => {
    // Handle form submission logic here
    getData(data);
    console.log(data);
  };

  return (
    <>
      <div className="p-4">
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <h2 className=" font-semibold">Customer Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors["firstName"] && (
                  <p className="text-red-500">{errors["firstName"].message}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors?.["lastName"] && (
                  <p className="text-red-500">{errors?.["lastName"].message}</p>
                )}
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 p-1 border rounded-lg w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors?.email && (
                <p className="text-red-500">{errors?.email.message}</p>
              )}
            </div>
            <div className="w-full ">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true,
                  className: "p- border rounded-lg w-full",
                  ref: register("phone", {
                    required: "Phone number is required",
                  }),
                }}
                country={"pk"}
                inputClass="input-field"
              />
              {errors?.phone && (
                <p className="text-red-500">{errors?.phone.message}</p>
              )}
            </div>
            <hr className="border mt-6"></hr>
          </div>

          <div className="w-full">
            <h2 className="pt-2 font-semibold">Shipping Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="shippingCity"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="shippingCity"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("shippingCity", {
                    required: "Shipping city is required",
                  })}
                />
                {errors?.["shippingCity"] && (
                  <p className="text-red-500">
                    {errors?.["shippingCity"].message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="shippingPostalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="shippingPostalCode"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("shippingPostalCode", {
                    required: "Shipping postal code is required",
                  })}
                />
                {errors?.["shippingPostalCode"] && (
                  <p className="text-red-500">
                    {errors?.["shippingPostalCode"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="shippingFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region:
              </label>
              <select
                id="shippingFrom"
                className="mt-1 p-1 border rounded-lg w-full"
                {...register("shippingFrom", {
                  required: "Shipping country is required",
                })}
              >
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
              {errors?.["shippingFrom"] && (
                <p className="text-red-500">
                  {errors?.["shippingFrom"].message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                required
                className="mt-1 p-1 border rounded-lg w-full"
                {...register("shippingAddress", {
                  required: "Shipping address is required",
                })}
              />
              {errors?.["shippingAddress"] && (
                <p className="text-red-500">
                  {errors?.["shippingAddress"].message}
                </p>
              )}
            </div>
            <hr className="border mt-6"></hr>
          </div>

          <div className="w-full">
            <h2 className="pt-2 font-semibold">Billing Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="billingCity"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="billingCity"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("billingCity", {
                    required: "Billing city is required",
                  })}
                />
                {errors?.["billingCity"] && (
                  <p className="text-red-500">
                    {errors?.["billingCity"].message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="billingPostalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="billingPostalCode"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                  {...register("billingPostalCode", {
                    required: "Billing postal code is required",
                  })}
                />
                {errors?.["billingPostalCode"] && (
                  <p className="text-red-500">
                    {errors?.["billingPostalCode"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="billingFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region:
              </label>
              <select
                id="billingFrom"
                className="mt-1 p-1 border rounded-lg w-full"
                {...register("billingFrom", {
                  required: "Billing country is required",
                })}
              >
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
              {errors?.["billingFrom"] && (
                <p className="text-red-500">
                  {errors?.["billingFrom"].message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="billingAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="billingAddress"
                required
                className="mt-1 p-1 border rounded-lg w-full"
                {...register("billingAddress", {
                  required: "Billing address is required",
                })}
              />
              {errors?.["billingAddress"] && (
                <p className="text-red-500">
                  {errors?.["billingAddress"].message}
                </p>
              )}
            </div>
            <hr className="border mt-6"></hr>
          </div>

          <div>
            <div className="flex justify-end gap-6 mt-4">
              <button
                type="button"
                onClick={() => [setOpen(false)]}
                className="rounded-md text-sm shadow-lg px-3 py-1 border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-500 px-3 py-1 text-white text-sm rounded-md hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default YourFormComponent;
