import { useSelector } from "react-redux";
import { getComponentBytype } from "../../components/fields";
import { CloseIcon } from "@chakra-ui/icons";
import Preview from "./preview/Preview";
import { useState, createRef } from "react";
import { useNavigate } from "react-router-dom";

const Compare = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.compare.models);
  if (!state.length) {
    navigate("/models");
  }
  const InputComponent = getComponentBytype(state[0]?.inputFormat[0]?.type);
  const [current, setCurrentInput] = useState(null);
  const [compareInput, setCompareInput] = useState(null);
  const inputRef = createRef();

  // const handleInputChange = (value) => {
  //   setCurrentInput(value);
  // };

  const handleCompare = () => {
    if (inputRef.current.value !== "") setCompareInput(inputRef.current.value);
  };

  return (
    <div className="compare">
      <div className="title">Compare your models</div>
      <div className="input">
        {InputComponent && (
          <InputComponent ref={inputRef} handleFieldChange={() => {}} />
        )}
      </div>

      <div className="selection">
        Selected:
        <div>
          {state.map((item) => (
            <span>
              {item.name}
              <CloseIcon boxSize={2} />
            </span>
          ))}
        </div>
      </div>
      <div className="divider">
        <button onClick={handleCompare}>Compare</button>
      </div>
      <div className="results-container">
        {state.map((item) => (
          <Preview item={item} input={compareInput} endpoint={item.endpoint} />
        ))}
      </div>
    </div>
  );
};

export default Compare;
