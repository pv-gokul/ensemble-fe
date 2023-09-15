import React from "react";
import "./styles.scss";

const Chip = ({ label, onClick, icon, isActive }) => {
  const Icon = icon;
  return (
    <div className={isActive ? "active chip" : "chip"} onClick={onClick}>
      <Icon />
      <span className="chip-text">{label}</span>
    </div>
  );
};

export default Chip;
