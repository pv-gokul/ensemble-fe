import React from "react";
import PricingCard from "../../components/pricing-card/PricingCard";
import "./styles.scss";

const plans = [
  {
    type: "Free",
    description: "This is a free trial with limited access",
    cost: "Free",
    features: ["10 workflows", "5 actions", "Access to free models"],
    label: "Free forever",
  },
  {
    type: "Standard",
    description: "Get access to all standard features",
    cost: "$xx/month",
    features: ["100 workflows", "30 actions", "Access to selected models"],
    label: "Buy now",
  },
  {
    type: "Enterprise",
    description: "Tailored solutions for large organizations",
    cost: "Contact Us",
    features: [
      "Unlimited workflows",
      "Unlimited actions",
      "Access to paid models",
    ],
    label: "Contact Us",
  },
];

const BillingPlan = () => {
  return (
    <div className="pricing-container">
      {plans.map((plan, index) => (
        <PricingCard key={index} {...plan} />
      ))}
    </div>
  );
};

export default BillingPlan;
