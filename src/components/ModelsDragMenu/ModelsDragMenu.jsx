import React, { useEffect, useState } from "react";
import { useGetAvailableModelsQuery } from "../../api/baseApi";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { generalModels } from "../../contants/constans";
import { getTransformedData } from "../../utils/menuData";
import { UilBars } from "@iconscout/react-unicons";
const ModelsDragMenu = ({ models, onDragStart, onCustomNodeAdd }) => {
  const [menuData, setMenuData] = useState({});
  const { data, isLoading, isSuccess } = useGetAvailableModelsQuery();

  useEffect(() => {
    if (data?.body) setMenuData(getTransformedData(data.body));
  }, [data]);

  return (
    <div className="text-sm p-5">
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
        {Object.keys(menuData)?.map((item) => (
          <AccordionItem key={item}>
            <h2>
              <AccordionButton _expanded={{ bg: "#47269e", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  {item}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <VStack>
                {Object.keys(menuData[item]).map((typeenum) => (
                  <div
                    key={typeenum}
                    className="inline-flex items-center border border-gray-300 rounded-lg p-2 mt-1 bg-white cursor-pointer w-full justify-between"
                    onDragStart={(event) => onDragStart(
                      event,
                      JSON.stringify({
                        type: typeenum,
                        modelId: menuData[item][typeenum][0].id,
                      })
                    )}
                    draggable
                  >
                    <h4>{menuData[item][typeenum][0].type}</h4>
                    <UilBars />
                  </div>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#47269e", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                General node
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <VStack>
              {generalModels.map((item) => (
                <div
                  className="inline-flex items-center border border-gray-300 rounded-lg p-2 mt-1 bg-white cursor-pointer w-full justify-between"
                  key={item.key}
                  onDragStart={(event) =>
                    onDragStart(
                      event,
                      JSON.stringify({
                        type: item.key,
                      })
                    )
                  }
                  draggable
                >
                  <h4>{item.label}</h4>
                  <UilBars />
                </div>
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ModelsDragMenu;
