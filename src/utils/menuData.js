
export const getTransformedData = (menuData) => {
  const groupedData = {};
  menuData.forEach(item => {
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

}