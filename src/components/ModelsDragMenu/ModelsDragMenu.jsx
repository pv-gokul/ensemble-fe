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
    <div className="drag-section">
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
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {item}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel p={0}>
              <VStack className="stack">
                {Object.keys(menuData[item]).map((typeenum) => (
                  <div
                    className="drag-item"
                    key={typeenum}
                    onDragStart={(event) =>
                      onDragStart(
                        event,
                        JSON.stringify({
                          type: typeenum,
                          modelId: menuData[item][typeenum][0].id,
                        })
                      )
                    }
                    draggable
                  >
                    <h4>{menuData[item][typeenum][0].type}</h4>
                  </div>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}

        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              General node
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel p={0}>
            <VStack className="stack">
              {generalModels.map((item) => (
                <div
                  className="drag-item"
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
