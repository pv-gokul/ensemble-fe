import React from "react";
import "./styles.scss";

const PricingCard = ({ type, description, cost, features, label }) => {
  return (
    <div className="pricing-card">
      <div className="pricing-type w-full">{type}</div>
      <div className="pricing-details">
        <div>{description}</div>
        <div className="pricing-cost">{cost}</div>
        <ul className="pricing-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="create-flow-button w-full" onClick={() => {}}>
          {label}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
