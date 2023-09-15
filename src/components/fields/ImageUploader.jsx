import React from "react";

const ImageUploader = ({ fieldName, handleFieldChange, value, classes }) => {
  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        handleFieldChange(base64Image, fieldName);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={classes}
      >
        <div className="flex">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 flex-1">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          {value && (
            <div className="flex-1">
              <img src={value} alt={fieldName} className="h-full"/>
            </div>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          onChange={(e) => handleImageUpload(e, fieldName)}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
