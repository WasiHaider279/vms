import * as yup from "yup";

//Signin
export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//Forgot Password
export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

//Reset Password
export const resetPasswordValidationSchema = yup.object().shape({
  new_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//Role
export const roleValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  permissions: yup.array().min(1, "At least one permission is required"),
});

//User
export const userAddValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  role: yup.string().required("Role is required"),
  password: yup.string().required("Password is required"),
});

//Permission
export const permissionValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  href: yup.string().required("URL is required"),
});

//Add Location
export const locationValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  status: yup.string().required("Status is required"),
});

const convertFileListToArray = (fileList: any) => {
  const filesArray = [];
  for (let i = 0; i < fileList.length; i++) {
    filesArray.push(fileList[i]);
  }
  return filesArray;
};

export const productValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  productCategory: yup.string().required("Product Category is required"),
  description: yup.string().required("Description is required"),
  productType: yup.string().required("Product Type is required"),
  tags: yup
    .mixed()
    .test({
      name: "isObject",
      message: "Tags is required",
      test: (value) =>
        typeof value === "object" && Object.keys(value).length > 0,
    })
    .test({
      name: "tagsArrayNotEmpty",
      message: "Tags is required",
      test: (value) => {
        return Array.isArray(value) && value.length > 0;
      },
    }),
  images: yup
    .mixed()
    .test({
      name: "isObject",
      message: "Image is required",
      test: (value) =>
        typeof value === "object" && Object.keys(value).length > 0,
    })
    .test({
      name: "imageArrayNotEmpty",
      message: "Image is required",
      test: (value) => {
        return Array.isArray(value) && value.length > 0;
      },
    })
    .test({
      name: "atLeastOneThumbnail",
      message: "Please set the thumbnail also",
      test: (value) => {
        return (
          Array.isArray(value) &&
          value.some((image) => image.thumbnail === true)
        );
      },
    }),
});

export const editProductValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  productCategory: yup.string().required("Product Category is required"),
  description: yup.string().required("Description is required"),
  productType: yup.string().required("Product Type is required"),
  tags: yup
    .mixed()
    .test({
      name: "isObject",
      message: "Tags is required",
      test: (value) =>
        typeof value === "object" && Object.keys(value).length > 0,
    })
    .test({
      name: "tagsArrayNotEmpty",
      message: "Tags is required",
      test: (value) => {
        return Array.isArray(value) && value.length > 0;
      },
    }),
  images: yup
    .mixed()
    .test({
      name: "isObject",
      message: "Image is required",
      test: (value) =>
        typeof value === "object" && Object.keys(value).length > 0,
    })
    .test({
      name: "imageArrayNotEmpty",
      message: "Image is required",
      test: (value) => {
        return Array.isArray(value) && value.length > 0;
      },
    })
    .test({
      name: "atLeastOneThumbnail",
      message: "Please set the thumbnail also",
      test: (value) => {
        return (
          Array.isArray(value) &&
          value.some((image) => image.thumbnail === true)
        );
      },
    }),
});
