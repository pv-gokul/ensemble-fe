import { useSelector } from "react-redux";
import { getComponentBytype } from "../../components/fields";
import { CloseIcon } from "@chakra-ui/icons";
import Preview from "./preview/Preview";
import { useState, createRef } from "react";

const Compare = () => {
  const state = useSelector((state) => state.compare);
  const InputComponent = getComponentBytype(state.inputType);
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
        {<InputComponent ref={inputRef} handleFieldChange={() => {}} />}
      </div>

      <div className="selection">
        Selected:
        <div>
          {state.models.map((item) => (
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
        {state.models.map((item) => (
          <Preview item={item} input={compareInput} />
        ))}
      </div>
    </div>
  );
};

export default Compare;
