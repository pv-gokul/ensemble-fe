import React, { forwardRef } from "react";

const TextArea = forwardRef(({ fieldName, value, handleFieldChange, classes }, ref) => (
  <textarea
    className={`textarea ${classes}`}
    id="message"
    rows="8"
    ref={ref}
    name={fieldName}
    placeholder="Write your input here..."
    value={value}
    onChange={(e) => handleFieldChange(e.target.value, fieldName)}
  />
));
export default TextArea;
