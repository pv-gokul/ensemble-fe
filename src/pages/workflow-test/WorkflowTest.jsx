import React, { useState } from "react";
import "./styles.scss";
import { FcProcess } from "react-icons/fc";
import InputComponent from "../../components/input-component/InputComponent";
import OutputComponent from "../../components/output-component/OutputComponent";
import { useTriggerWorkflowMutation } from "../../api/baseApi";

const WorkflowTest = (props) => {
  const [workflow, setWorkflow] = useState({
    input: [
      {
        field: "text",
        type: "text",
      },
      {
        field: "image",
        type: "image",
      },
    ],
    output: {
      field: "text",
      type: "text",
    },
  });
  const [formData, setFormData] = useState({});
  const [trigger, { isLoading, isError, data: output }] =
    useTriggerWorkflowMutation();

  const handleFieldChange = (newValue, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const handleTestWorkflow = () => {
    trigger({ url: `trigger-workflow/${workflow.id}`, data: formData });
  };

  return (
    <div className="workflow-test">
      <div className="workflow-diagram">Workflow diagram</div>
      <div className="input-output">
        <div className="component input">
          <InputComponent
            inputDefinitions={workflow.input}
            handleFieldChange={handleFieldChange}
            formData={formData}
          />
        </div>
        <div className="component output">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <OutputComponent
              output={output}
              outputDefinition={workflow.output}
            />
          )}
        </div>
        <button className="test-button" onClick={handleTestWorkflow}>
          <FcProcess />
        </button>
      </div>
    </div>
  );
};

export default WorkflowTest;
