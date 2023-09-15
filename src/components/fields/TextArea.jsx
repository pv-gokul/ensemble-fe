import React from "react";

const TextArea = ({fieldName, value, handleFieldChange}) => (
  <textarea
    id="message"
    rows="4"
    name={fieldName}
    placeholder="Write your input here..."
    value={value}
    onChange={(e) => handleFieldChange(e.target.value, fieldName)}
    class="block mb-6 mt-6 p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
);
export default TextArea;