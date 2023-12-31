import { Select, Input, Switch, Stack } from "@chakra-ui/react";
import FieldWrapper from "../../FieldWapper/FieldWrapper";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";
import FormWrapper from "../../form-wrapper/FormWrapper";

const httpRequestTypes = [
  { key: "GET", label: "GET" },
  { key: "POST", label: "POST" },
  { key: "PUT", label: "PUT" },
];

const HttpNodeForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [httpMethod, setHttpMethod] = useState('GET');
  const [httpUrl, setHttpUrl] = useState();
  const [sendHeaders, setSendHeaders] = useState(false);
  const [jsonHeader, setJsonHeader] = useState(
    '{ "Content-Type": "", "Authorization": "", "User-Agent": "" }'
  );
  const [sendBody, setSendBody] = useState(false);
  const [jsonBody, setJsonBody] = useState('{ "name": "xyz" }');

  const handleOnSubmit = () => {
    onSubmit({
      ...(sendHeaders ? { header: jsonHeader } : {}),
      ...(sendBody ? { body: jsonBody } : {}),
      method: httpMethod,
      url: httpUrl,
      name,
    });
  };
  return (
    <FormWrapper onSubmit={handleOnSubmit} onCancel={onCancel} isSubmitDisabled={!httpUrl}>
      <Stack>
        <FieldWrapper>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Method">
          <div className="mt-">
            <Select value={httpMethod} onChange={(e) => setHttpMethod(e.target.value)}>
              {httpRequestTypes.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                );
              })}
            </Select>
          </div>
        </FieldWrapper>

        <FieldWrapper label="URL">
          <Input placeholder="Url" onChange={(e) => { setHttpUrl(e.target.value) }} />
        </FieldWrapper>

        <Stack spacing={2}>
          <FieldWrapper label="Send Headers">
            <Switch
              onChange={() => {
                setSendHeaders((prev) => !prev);
              }}
              value={sendHeaders}
            />
          </FieldWrapper>

          <div className={twMerge(!sendHeaders && "hidden")}>
            <FieldWrapper label="JSON">
              <Editor
                height="15vh"
                defaultLanguage="json"
                defaultValue={jsonHeader}
                value={jsonHeader}
                onChange={(val) => setJsonHeader(val)}
                options={{ minimap: { enabled: false } }}
              />
            </FieldWrapper>
          </div>
        </Stack>

        <Stack spacing={2}>
          <FieldWrapper label="Send Body">
            <Switch
              onChange={() => {
                setSendBody((prev) => !prev);
              }}
              value={sendBody}
            />
          </FieldWrapper>

          <div className={twMerge(!sendBody && "hidden")}>
            <FieldWrapper label="JSON">
              <Editor
                height="15vh"
                defaultLanguage="json"
                defaultValue={jsonBody}
                value={jsonBody}
                onChange={(val) => setJsonBody(val)}
                options={{ minimap: { enabled: false } }}
              />
            </FieldWrapper>
          </div>
        </Stack>
      </Stack>
    </FormWrapper>
  );
};

export default HttpNodeForm;
