import React from "react";
import { FaFire } from "react-icons/fa";
import "./styles.scss";

const ModelCard = ({ title, icon, input, output, popularity, updated }) => {
  const Icon = icon;
  return (
    <div className="model-wrapper">
      <div className="model-header">
        <Icon />
        <span className="chip-text">{title}</span>
      </div>
      <div className="meta-data-wrapper">
        <div className="input-data">{`${input?.type}-to-${output?.type}`}</div>
        <div className="dot">.</div>
        <div className="popularity">
          <FaFire />
          <div className="count">{popularity}</div>
        </div>
        <div className="dot">.</div>
        <div className="updated">{updated}</div>
      </div>
    </div>
  );
};

export default ModelCard;
