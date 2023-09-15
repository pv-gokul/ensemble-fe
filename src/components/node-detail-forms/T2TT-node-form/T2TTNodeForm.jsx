import React, { useState } from "react";
import { Checkbox, Input, Select } from "@chakra-ui/react";
import FieldWrapper from "../../FieldWapper/FieldWrapper";
import Editor from "@monaco-editor/react";
import { Stack } from "@chakra-ui/react";
import FormWrapper from "../../form-wrapper/FormWrapper";
import { modelsDummyData } from "../../../contants/constans";

const availableLanguages = [{ label: "Javascript", value: "javascript" }];

const T2TTNodeForm = ({
  language = "javascript",
  code = null,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState();
  const [selectedModelId, setSelectedModelId] = useState();
  const [useFallback, setUseFallback] = useState(true);
  const handleSubmit = () => {
    const formData = { modelId: selectedModelId, name };
    onSubmit(formData);
  };

  const handleModelSelectionChange = (id) => {
    setSelectedModelId(id);
  };
  console.log(useFallback);
  return (
    <FormWrapper onSubmit={handleSubmit} onCancel={onCancel}>
      <Stack spacing={4}>
        <FieldWrapper label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Select Model">
          <Select value={selectedModelId} onChange={(e) => handleModelSelectionChange(e.target.value)}>
            {modelsDummyData.T2TT.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </FieldWrapper>
        <Checkbox
          isChecked={useFallback}
          onChange={() => {
            setUseFallback((prev) => !prev);
          }}
        >
          Use Fallback
        </Checkbox>
      </Stack>
    </FormWrapper>
  );
};

export default T2TTNodeForm;
