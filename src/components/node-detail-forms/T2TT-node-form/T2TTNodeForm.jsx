import React, { useEffect, useState } from "react";
import { Checkbox, Input, Select } from "@chakra-ui/react";
import FieldWrapper from "../../FieldWapper/FieldWrapper";
import Editor from "@monaco-editor/react";
import { Stack } from "@chakra-ui/react";
import FormWrapper from "../../form-wrapper/FormWrapper";
import { modelsDummyData } from "../../../contants/constans";
import { useGetAvailableModelsQuery } from "../../../api/baseApi";

const availableLanguages = [{ label: "Javascript", value: "javascript" }];

const T2TTNodeForm = ({
  language = "javascript",
  code = null,
  onSubmit,
  onCancel,
  type,
  currentSelectedNode
}) => {
  const [name, setName] = useState(currentSelectedNode.data.name);
  const [selectedModelId, setSelectedModelId] = useState(currentSelectedNode.data.modelId);
  const [useFallback, setUseFallback] = useState(true);
  const [availableModels, setAvailableModels] = useState([]);
  const handleSubmit = () => {
    const formData = { modelId: selectedModelId, name };
    onSubmit(formData);
  };

  const handleModelSelectionChange = (id) => {
    setSelectedModelId(id);
  };
  

  const { data, isLoading, isSuccess } = useGetAvailableModelsQuery();

  const getAvailableModels = (dataValues, type) => {
    return dataValues.filter(item => item.typeenum == type)
  }
  useEffect(() => {
    if(type && data?.body) {
      const k = getAvailableModels(data.body, type)
      setAvailableModels(k)
    }
  }, [data, type]);


  return (
    <FormWrapper onSubmit={handleSubmit} onCancel={onCancel}>
      <Stack spacing={4}>
        <FieldWrapper label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Select Model">
          <Select value={selectedModelId} onChange={(e) => handleModelSelectionChange(e.target.value)}>
            {availableModels.map((item) => {
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
