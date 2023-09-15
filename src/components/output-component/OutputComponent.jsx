import React from "react";

const OutputComponent = ({ output, outputDefinition }) => {
  const content = output?.[outputDefinition.field];

  return (
    <>
      {output &&
        {
          text: <div>{content}</div>,
          image: <img src={content} className="h-full" />,
        }[outputDefinition.type]}
    </>
  );
};

export default OutputComponent;
