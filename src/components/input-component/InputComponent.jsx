import React from "react";
import { TextArea, ImageUploader } from "../fields";

const InputComponent = ({ inputDefinitions, handleFieldChange, formData }) => {
  const fieldTypeData = {
    text: {
      component: TextArea,
      classes:
        "block p-2.5 flex-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300",
    },
    image: {
      component: ImageUploader,
      classes:
        "flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50",
    },
  };

  return (
    <>
      {inputDefinitions?.map((input) => {
        const InputField = fieldTypeData[input.type]?.component;
        return (
          <InputField
            handleFieldChange={handleFieldChange}
            fieldName={input.field}
            value={formData[input.field] || ""}
            key={input.id}
            classes={fieldTypeData[input.type]?.classes}
          />
        );
      })}
    </>
  );
};

export default InputComponent;
