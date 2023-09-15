import { UilRocket, UilArrowsLeftDown, UilBracketsCurly, UilGlobe, UilTextFields } from "@iconscout/react-unicons";

export const workflowIcons = {
  startNode: <UilRocket color="#6563FF"/>,
  ifNode: <UilArrowsLeftDown color="#fc037f"/>,
  codeNode: <UilBracketsCurly color="#fcba03" />,
  httpsNode: <UilGlobe color="#0356fc" />,
  T2TT: <UilTextFields color="#0356fc" />,
};

export const modelsDummyData = {
  T2TT: [{ id: 1, name: "Chat GPT" }, { id: 2, name: "My GPT Model" }]
};

export const generalModels = [
  { key: "startNode", label: "Start" },
  { key: "endNode", label: "End" },
  { key: "ifNode", label: "IF" },
  { key: "codeNode", label: "Code" },
  { key: "httpsNode", label: "Https" }
];