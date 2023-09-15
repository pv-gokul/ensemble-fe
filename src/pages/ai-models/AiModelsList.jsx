import React, { useState } from "react";
import { FaNeos } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import "./styles.scss";
import Chip from "../../components/chip/Chip";
import ModelCard from "../../components/model-card/ModelCard";
import { setCompareModelData } from "../../redux/compareSlice";

const initialModelData = {
  name: "Summarizer",
  key: "summarizer",
  icon: FaNeos,
  description:
    "A text summarizer is an online tool that wraps up a text to a specified short length. It condenses a long article to main points.",
  models: [
    {
      name: "Bert",
      icon: FaNeos,
      input: { field: "string", type: "string" },
      output: { field: "string", type: "string" },
      endpoint: "string",
      popularity: "2.5K",
      updated: "Updated 2 days ago",
    },
    {
      name: "Chat gpt",
      icon: FaNeos,
      input: { field: "string", type: "string" },
      output: { field: "string", type: "string" },
      endpoint: "string",
      popularity: "4.5K",
      updated: "Updated 12 hours ago",
    },
  ],
};

const AiModelsList = () => {
  const [selectedTask, setSelectedTask] = useState(initialModelData);
  const [compareModels, setCompareModels] = useState([]);
  const dispatch = useDispatch();

  const modelData = [
    {
      type: "Natural Language Processing",
      icon: FaNeos,
      subtypes: [
        {
          name: "Summarizer",
          key: "summarizer",
          icon: FaNeos,
          description:
            "A text summarizer is an online tool that wraps up a text to a specified short length. It condenses a long article to main points.",
          models: [
            {
              id: "d8c8f55a-89d0-4a9d-97e2-1d298579c2eb",
              name: "Bert",
              icon: FaNeos,
              input: { field: "string", type: "String" },
              output: { field: "string", type: "String" },
              endpoint: "string",
              popularity: "2.5K",
              updated: "Updated 2 days ago",
            },
            {
              id: "ae9e619b-9400-4f32-a37d-70377efb88d6",
              name: "Chat gpt",
              icon: FaNeos,
              input: { field: "string", type: "String" },
              output: { field: "string", type: "String" },
              endpoint: "string",
              popularity: "4.5K",
              updated: "Updated 12 hours ago",
            },
          ],
        },
        { name: "Sentiment Analysis", key: "sentiment-analysis", icon: FaNeos },
        {
          name: "Text Classification",
          key: "text-classification",
          icon: FaNeos,
        },
      ],
      key: "NLP",
    },
    {
      type: "Computer Vision",
      icon: FaNeos,
      subtypes: [
        {
          name: "CNN",
          key: "CNN",
          icon: FaNeos,
          models: [
            {
              id: "3f8a6ddb-6b70-4ef3-a897-4eef0f462d43",
              name: "Bert",
              icon: FaNeos,
              input: { field: "string", type: "string" },
              output: { field: "string", type: "string" },
              endpoint: "string",
            },
            {
              id: "2ec01db8-5a25-4e0e-a632-7df3ebd505c2",
              name: "Chat gpt",
              icon: FaNeos,
              input: { field: "string", type: "string" },
              output: { field: "string", type: "string" },
              endpoint: "string",
            },
          ],
        },
        {
          name: "Sentiment Analysis",
          key: "sentiment-analysis",
          icon: FaNeos,
          models: [
            {
              name: "Something",
              icon: FaNeos,
              input: { field: "string", type: "string" },
              output: { field: "string", type: "string" },
              endpoint: "string",
            },
            {
              name: "Nothing",
              icon: FaNeos,
              input: { field: "string", type: "string" },
              output: { field: "string", type: "string" },
              endpoint: "string",
            },
          ],
        },
        {
          name: "Text Classification",
          key: "text-classification",
          icon: FaNeos,
        },
      ],
      key: "CV",
    },
  ];

  const handleCompareCheck = (e, value) => {
    const { checked } = e.target;
    if (checked) {
      setCompareModels([...compareModels, value]);
    } else {
      setCompareModels(compareModels.filter((id) => id !== value));
    }
  };

  const handleCompare = () => {
    const modelData = compareModels.map((id) => {
      return selectedTask.models.find((model) => model.id === id);
    });
    dispatch(setCompareModelData(modelData));
  };

  return (
    <div className="model-list-wrapper">
      <div className="tasks-wrapper">
        <div className="task-header">Tasks</div>
        <div className="tasks-list">
          {modelData.map((model) => (
            <div className="task-container">
              <div className="task-title">{model.type}</div>
              <div className="tasks">
                {model?.subtypes?.map((subtype) => (
                  <div className="task-subtype">
                    <Chip
                      label={subtype?.name}
                      icon={subtype?.icon}
                      onClick={() => setSelectedTask(subtype)}
                      isActive={subtype?.key === selectedTask?.key}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="models-wrapper">
        <div className="models-header">Models</div>
        <div className="description-wrapper">
          <div className="title">{selectedTask.name}</div>
          <div className="description">{selectedTask.description}</div>
        </div>
        <div className="model-list">
          {selectedTask?.models?.map((model) => (
            <div className="modal-card-container">
              <div className="compare-checkbox">
                <Checkbox
                  colorScheme="red"
                  isChecked={compareModels.includes(model.id)}
                  onChange={(e) => handleCompareCheck(e, model.id)}
                />
              </div>
              <ModelCard
                title={model.name}
                icon={model.icon}
                input={model.input}
                output={model.output}
                popularity={model.popularity}
                updated={model.updated}
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleCompare}>Compare</button>
    </div>
  );
};

export default AiModelsList;
