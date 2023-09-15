import React, { useEffect, useState } from 'react'
import { useGetAvailableModelsQuery } from '../../api/baseApi';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react'
const ModelsDragMenu = ({models, onDragStart, onCustomNodeAdd}) => {
  const [menuData, setMenuData] = useState({})
  const { data, isLoading, isSuccess  } = useGetAvailableModelsQuery();

  const getTransformedData = (menuData) => {
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

  useEffect(() =>{
    if(data?.body) setMenuData(getTransformedData(data.body))

  },[data])

  return (
    <div className='text-sm p-5'>
      {/* {models.map((item) => {
      return (
        <div
          className=""
          key={item.key}
          onDragStart={(event) => onDragStart(event, item.key)}
          draggable
        >
          <h4>{item.label}</h4>
        </div>
      );
    })} */}
    <Accordion defaultIndex={[0]} allowMultiple>
      {Object.keys(menuData)?.map(item => (
        <AccordionItem>
    <h2>
      <AccordionButton _expanded={{ bg: '#47269e', color: 'white' }}>
        <Box as="span" flex='1' textAlign='left'>
          {item}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel p-0>
      <VStack>
      {Object.keys(menuData[item]).map(typeenum =>(
        <div
        key={typeenum}
        className="inline-flex items-center border border-gray-300 rounded-lg p-2 mt-1 bg-white cursor-pointer"  
        onDragStart={(event) => onDragStart(event, typeenum)}
        draggable
      >
        <h4>{menuData[item][typeenum][0].type}</h4>
      </div>
      )) }
      </VStack>
    </AccordionPanel>
  </AccordionItem>
      ))}
     
</Accordion>
    </div>
  )
}

export default ModelsDragMenu