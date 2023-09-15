import React, { useState } from "react";
import { FaNeos } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import "./styles.scss";
import Chip from "../../components/chip/Chip";
import ModelCard from "../../components/model-card/ModelCard";
import { setCompareModelData } from "../../redux/compareSlice";
import { useGetModelsQuery } from "../../api/baseApi";
import { useNavigate } from "react-router-dom";

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
  const { data, error, isLoading } = useGetModelsQuery();
  const [selectedTask, setSelectedTask] = useState(initialModelData);
  const [compareModels, setCompareModels] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data);

  const modelData = data?.body;

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
    console.log(modelData);
    dispatch(setCompareModelData(modelData));
    navigate("/compare");
  };

  return (
    <div className="model-list-wrapper">
      <div className="tasks-wrapper">
        <div className="title">Tasks</div>

        <div className="tasks-list">
          {modelData?.map((model) => (
            <div className="task-container">
              <div className="task-title">{model.type}</div>
              <div className="tasks">
                {model.subtypes.map((subtype) => (
                  <div className="task-subtype">
                    <Chip
                      label={subtype.name}
                      icon={subtype.icon}
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
      <div className="divider" />
      <div className="models-wrapper">
        <div className="title">Models</div>
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
        <div className="compare-wrapper">
          Add your models to compare !
          <button onClick={handleCompare}>Compare now</button>
        </div>
      </div>
      {/* <button onClick={handleCompare}>Compare</button> */}
    </div>
  );
};

export default AiModelsList;
