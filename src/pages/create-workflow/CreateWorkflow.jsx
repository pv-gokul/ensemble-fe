import { useNodesState, useEdgesState, MarkerType } from "reactflow";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import "reactflow/dist/style.css";

import WorkflowCreationSection from "../../components/workflow-creation-section/WorkfkowCreationSection";
import { useGetAvailableModelsQuery } from "../../api/baseApi";
import CodeForm from "../../components/node-detail-forms/code-node-form/CodeForm"
import { UilBracketsCurly } from "@iconscout/react-unicons";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import HttpNodeForm from "../../components/node-detail-forms/http-node-form/HttpNodeForm";
import { workflowIcons } from "../../contants/constans";
import ModelsDragMenu from "../../components/ModelsDragMenu/ModelsDragMenu";

const initialNodes = [];
const initialEdges = [];

const models = [
  { key: "startNode", label: "Start" },
  { key: "endNode", label: "End" },
  { key: "ifNode", label: "IF" },
  { key: "codeNode", label: "Code" },
  { key: "httpsNode", label: "Https" },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log({nodes});
  console.log({edges});

  const { data, isLoading, isSuccess  } = useGetAvailableModelsQuery();

  console.log(data);

  const handleOnConnect = useCallback(
    (params) => {
      setEdges((eds) => [
        ...eds,
        {
          id: `${params.source}-${params.target}`,
          source: params.source,
          sourceHandle: params.sourceHandle,
          target: params.target,
          type: "smoothstep",
          // TODO: if at all label is needed
          // label: "smoothstep"
          // for arrow tip at the end of the node
          style: {
            strokeWidth: 1.5,
            stroke: "#808080",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#808080",
            strokeWidth: 1.5,
          },
        },
      ]);
    },
    [setEdges]
  );

  const handleNodeDeleteClick = (id) => {
    // TODO: Remove the edges also
    setNodes((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeDetail = models.find((item) => item.key === type);
      const id = uuidv4();
      setNodes((nds) => [
        ...nds,
        {
          id,
          position,
          data: {
            label: nodeDetail?.label || "",
            onDelete: () => handleNodeDeleteClick(id),
          },
          type,
        },
      ]);
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleNodeClick = useCallback((node) => {
    setCurrentSelectedNode(node);
    onOpen();
  }, []);

  const handleNodeEditSubmit = useCallback((data) => {
    console.log(data, "Node Edit submitted");
    setCurrentSelectedNode(null);
  }, []);

  const handleNodEditCancel = useCallback(() => {
    onClose();
    setCurrentSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-row h-full">
      
      <div className="flex-1" ref={reactFlowWrapper}>
        <WorkflowCreationSection
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          handleOnConnect={handleOnConnect}
          onNodeClick={handleNodeClick}
          setReactFlowInstance={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>
      <div className="bg-indigo-100 w-[250px]">
        <h3 className="text-lg pb-3">Models</h3>
          {/* {models.map((item) => {
            return (
              <div
                className=""
                key={item.key}
                onClick={() => onCustomNodeAdd(item.key)}
                onDragStart={(event) => onDragStart(event, item.key)}
                draggable
              >
                <h4>{item.label}</h4>
              </div>
            );
          })} */}
          <ModelsDragMenu onDragStart={onDragStart} models={models}/>
      </div>

      {currentSelectedNode && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <div>{workflowIcons[currentSelectedNode?.type]}</div>
                <div>{currentSelectedNode.data.label}</div>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="p-2 cursor-pointer">
                <div className="w-72">
                  {currentSelectedNode.type === "codeNode" && (
                    <CodeForm
                      onSubmit={handleNodeEditSubmit}
                      onCancel={handleNodEditCancel}
                    />
                  )}
                  {currentSelectedNode.type === "httpsNode" && (
                    <HttpNodeForm
                      onSubmit={handleNodeEditSubmit}
                      onCancel={handleNodEditCancel}
                    />
                  )}
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default App;
