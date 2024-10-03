import React, { useState, useEffect } from "react";
import {
  FieldValues,
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  fieldRequired: boolean;
  register: UseFormRegister<any>;
  errors: any;
  watch?: any;
  setValue?: any;
  getValues?: any;
  clearErrors?: any;
}

interface ProductInfoType {
  thumbnail: boolean;
}

const ImageUploadForm: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  register,
  label,
  type,
  fieldRequired,
  errors,
  setValue,
  watch,
  clearErrors,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<number | null>(0);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ image: File; thumbnail: ProductInfoType }>
  >([]);

  const handleThumbnailChange = (index: number) => {
    const currentImages = watch(name) || [];

    if (index >= 0 && index < currentImages.length) {
      const updatedImages = currentImages.map((image: any, i: number) => ({
        ...image,
        thumbnail: i === index,
      }));

      setValue(name, updatedImages);
      clearErrors(name);
    }
  };

  const handleDeleteImage = (index: number) => {
    const currentImages = watch(name) || [];

    if (index >= 0 && index < currentImages.length) {
      const updatedImages = currentImages.filter(
        (_: any, i: any) => i !== index
      );
      setValue(name, updatedImages);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file: file,
        thumbnail: false,
      }));
      setValue(name, [...(watch(name) || []), ...newImages]);
      clearErrors(name);
    }
  };

  return (
    <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
      <h2 className="text-zinc-800 text-sm font-medium font-inter leading-[21px]">
        Media
      </h2>
      <div className="flex items-center justify-center w-full ">
        <label
          id={name}
          // htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-20 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200"
        >
          <div className="flex items-center justify-center gap-2 h-[225px]">
            <svg
              className="w-8 h-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className=" text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload</span>
            </p>
          </div>
          <input
            {...register(`${name}`, {
              required: fieldRequired ? `${name} is required!` : false,
            })}
            id={name}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      <div>
        {typeof watch!(name) === "object" &&
          Object.values(watch!(name))?.map((image: any, index: number) => (
            <div
              key={index}
              style={{ display: "inline-block", margin: "5px" }}
              className="relative cursor-pointer"
              onClick={() => handleThumbnailChange(index)}
            >
              {image.thumbnail && (
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-1 rounded">
                  Thumbnail
                </span>
              )}
              <img
                src={
                  typeof image === "object" && image.url
                    ? image.url
                    : URL.createObjectURL(image.file)
                }
                alt={`Uploaded ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />

              <div className="flex flex-col z-20 absolute bottom-0 right-0 py-2 px-3">
                <div
                  className=" ml-auto focus:outline-none bg-gray-300 hover:bg-red-600 p-1 rounded-md text-gray-800 hover:text-white cursor-pointer"
                  onClick={() => handleDeleteImage(index)}
                >
                  <svg
                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>

      {errors?.[name] && (
        <span className="text-red-400 text-sm font-inter">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default ImageUploadForm;
