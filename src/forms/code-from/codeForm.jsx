import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import FieldWrapper from "../../components/FieldWapper/FieldWrapper";

const availableLanguages = [{ label: "Javascript", value: "javascript" }];

const CodeForm = ({ language = "javascript", code }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  return (
    <>
      <FieldWrapper>
        <Select placeholder="Select option">
          {availableLanguages.map((item) => (
            <option value={item.value} onClick={() => setSelectedLanguage(item.value)}>
              {item.label}
            </option>
          ))}
        </Select>
      </FieldWrapper>
    </>
  );
};

export default CodeForm;
