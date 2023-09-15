import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import FieldWrapper from "../../FieldWapper/FieldWrapper";
import Editor from "@monaco-editor/react";
import { Stack } from "@chakra-ui/react";
import FormWrapper from "../../form-wrapper/FormWrapper";

const availableLanguages = [{ label: "Javascript", value: "javascript" }];

const CodeForm = ({ language = "javascript", code = null, onSubmit }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [codeData, setCodeData] = useState(code);

  const handleSubmit = () => {
    const formData = { language: selectedLanguage, code: codeData };
    onSubmit(formData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FieldWrapper>
          <Select defaultValue={language}>
            {availableLanguages.map((item) => (
              <option
                value={item.value}
                onClick={() => setSelectedLanguage(item.value)}
              >
                {item.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <div>
          <Editor
            height="500px"
            defaultLanguage={selectedLanguage}
            onChange={(value) => setCodeData(value)}
          />
        </div>
      </Stack>
    </FormWrapper>
  );
};

export default CodeForm;
