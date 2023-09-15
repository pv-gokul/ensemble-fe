import React from "react";
import "./styles.scss";
import { getIcon } from "../../utils/menuData";

const Chip = ({ label, onClick, type, isActive }) => {
  const Icon = getIcon(type);
  return (
    <div className={isActive ? "active chip" : "chip"} onClick={onClick}>
      <Icon size={20}/>
      <span className="chip-text">{label}</span>
    </div>
  );
};

export default Chip;
