import React, { useState } from "react";
interface InputFieldProps {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  productData?: any;
  // Add other props here if needed
}

const ImageField: React.FC<InputFieldProps> = ({
  selectedImages,
  setSelectedImages,
  productData,
}) => {
  // const [selectedImages, setSelectedImages] = useState([]);
  // const uploadImage = (event: any) => {
  //   const selectedFile = event.target.files;
  //   const selectedFileArray = Array.from(selectedFile);
  //   setSelectedImages((previousImages) =>
  //     // @ts-ignore
  //     previousImages?.concat(selectedFileArray)
  //   );
  // };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFileArray: File[] = Array.from(event.target.files);
      setSelectedImages((previousImages) =>
        previousImages.concat(selectedFileArray)
      );
    }
  };

  return (
    <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
      <h2 className="text-gray-500 text-sm font-medium font-inter leading-[21px]">
        Media
      </h2>
      <div className="flex items-center justify-center w-full ">
        <label
          htmlFor="dropzone-file"
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
            <p className=" text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            onChange={uploadImage}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
        </label>
      </div>

      <div className="flex flex-wrap -m-1">
        {selectedImages &&
          selectedImages?.map((image, index) => (
            <div className="p-1 h-24 relative">
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-full object-cover rounded-lg bg-fixed"
                alt="Product Images"
              />
              <div className="flex flex-col z-20 absolute bottom-0 right-0 py-2 px-3">
                <button
                  type="button"
                  className=" ml-auto focus:outline-none bg-gray-300 p-1 rounded-md text-gray-800"
                  onClick={() => {
                    setSelectedImages(
                      selectedImages?.filter((e) => e !== image)
                    );
                  }}
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
                </button>
              </div>
            </div>
          ))}

        {productData &&
          productData?.map((image: any, index: any) => (
            <div className="p-1 h-24 relative">
              <img
                src={image.url}
                className="w-full h-full object-cover rounded-lg bg-fixed"
                alt="Product Images"
              />
              <div className="flex flex-col z-20 absolute bottom-0 right-0 py-2 px-3">
                <button
                  type="button"
                  className=" ml-auto focus:outline-none bg-gray-300 p-1 rounded-md text-gray-800"
                  onClick={() => {
                    setSelectedImages(
                      selectedImages?.filter((e) => e !== image)
                    );
                  }}
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
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageField;
