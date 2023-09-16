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
  id: "513672ed-9aad-4c11-a659-1540b8d3fac5",
  name: "Language Detection",
  endpoint: "http://192.168.3.117:5000/detect-lang",
  paid: false,
  inputFormat: [
    {
      field: "text",
      type: "text",
    },
  ],
  outputFormat: {
    field: "src",
    type: "text",
  },
  typeenum: "LanguageDetection",
  type: "Language Detection",
  category: "NLP",
};

const AiModelsList = () => {
  const { data, error, isLoading } = useGetModelsQuery();
  const [selectedTask, setSelectedTask] = useState(initialModelData);
  const [compareModels, setCompareModels] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                      type={subtype.key}
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
                input={model.inputFormat[0]}
                output={model.outputFormat}
                popularity={model.popularity}
                updated={model.updatedAt}
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
