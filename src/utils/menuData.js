import {
  UilTextFields,
  UilFileInfoAlt,
  UilKeyboard,
  UilSmile,
  UilFont,
  UilMicrophone,
  UilRss,
  UilRightIndentAlt,
  UilScenery,
  UilImageEdit,
  UilEnglishToChinese,
  UilProcess,
  UilArrowsLeftDown,
  UilBracketsCurly,
  UilGlobe
} from "@iconscout/react-unicons";

export const getTransformedData = (menuData) => {
  const groupedData = {};
  menuData.forEach((item) => {
    const category = item.category;
    const typeenum = item.typeenum;

    // If the category doesn't exist in groupedData, create it
    if (!groupedData[category]) {
      groupedData[category] = {};
    }

    // If the typeenum doesn't exist in the category, create it as an array
    if (!groupedData[category][typeenum]) {
      groupedData[category][typeenum] = [];
    }

    // Add the item to the corresponding typeenum array within the category
    groupedData[category][typeenum].push(item);
  });

  return groupedData;
};

export const getIcon = (type) =>
  ({
    LanguageDetection: UilFont,
    Sentiment: UilSmile,
    Summarizer: UilFileInfoAlt,
    PromptGenerator: UilKeyboard,
    T2T: UilTextFields,
    S2TT: UilRightIndentAlt,
    S2ST: UilRss,
    T2ST: UilMicrophone,
    TI2I: UilImageEdit,
    T2TT: UilEnglishToChinese,
    T2I: UilScenery,
    ifNode: UilArrowsLeftDown,
    codeNode: UilBracketsCurly,
    httpsNode: UilGlobe
  }[type] || UilProcess);

  export const getIconColor = (type) =>
  ({
    LanguageDetection: 'yellow',
    Sentiment: 'blue',
    Summarizer: "orange",
    PromptGenerator: 'red',
    T2T: 'green',
    S2TT: 'grey',
    S2ST: 'purple',
    T2ST: 'violet',
    TI2I: 'cyan',
    T2TT: 'brown',
    T2I: 'indigo',
    ifNode: '#fc037f',
    codeNode: '#fcba03',
    httpsNode: 'blue'
  }[type] || 'black');

