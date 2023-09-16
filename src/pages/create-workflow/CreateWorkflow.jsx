import {
  useNodesState,
  useEdgesState,
  MarkerType,
  getConnectedEdges,
} from "reactflow";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "reactflow/dist/style.css";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

import WorkflowCreationSection from "../../components/workflow-creation-section/WorkfkowCreationSection";
import {
  useGetAvailableModelsQuery,
  useGetWorkflowByIdQuery,
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from "../../api/baseApi";
import { HStack } from "@chakra-ui/react";
import CodeForm from "../../components/node-detail-forms/code-node-form/CodeForm";
import HttpNodeForm from "../../components/node-detail-forms/http-node-form/HttpNodeForm";
import { workflowIcons } from "../../contants/constans";
import ModelsDragMenu from "../../components/ModelsDragMenu/ModelsDragMenu";
import T2TTNodeForm from "../../components/node-detail-forms/T2TT-node-form/T2TTNodeForm";

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
  const [workflowName, setWorkflowName] = useState("");
  const reactFlowWrapper = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: modelsList,
    isLoading,
    isSuccess,
  } = useGetAvailableModelsQuery();
  const [saveWorkFlow] = useSaveWorkflowMutation();
  const [updateWorkflow] = useUpdateWorkflowMutation();

  const currentURL = window.location.href;

  // Use a regular expression to extract the 'id' parameter
  const idMatch = currentURL.match(/\/workflow\/edit\/(\d+)/);

  const id = idMatch?.[1];
  console.log(id);
  const {
    data: workflowData,
    error,
    isLoading: isWorkflowLoading,
  } = useGetWorkflowByIdQuery(id);

  const navigate = useNavigate();

  useEffect(() => {
    if (workflowData?.body) {
      const {
        config: { nodes, edges },
        name,
      } = workflowData.body;
      setNodes(nodes);
      setEdges(edges);
      setWorkflowName(name);
    }
  }, [workflowData]);

  // TODO: handle the special scenario for if node since it has two outputs
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

  const handleNodeEditSubmit = (updatedData) => {
    setNodes((prevNodes) => {
      const editingNode = prevNodes.find(
        (item) => item.id === currentSelectedNode.id
      );
      const filteredNodes = prevNodes.filter(
        (item) => item.id !== currentSelectedNode.id
      );
      const modifiedEditingNode = {
        ...editingNode,
        data: { ...editingNode.data, ...updatedData },
      };
      return [...filteredNodes, modifiedEditingNode];
    });
    setCurrentSelectedNode(null);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const response = event.dataTransfer.getData("application/reactflow");
      const { type, modelId } = JSON.parse(response);

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
            ...(modelId
              ? { model: modelsList.body.find((item) => item.id === modelId) }
              : {}),
          },
          type,
        },
      ]);
    },
    [reactFlowInstance, modelsList]
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

  const handleNodEditCancel = useCallback(() => {
    onClose();
    setCurrentSelectedNode(null);
  }, []);

  const handleSaveWorkflow = () => {
    const isEdit = window.location.href.includes("/edit/");
    // console.log(isEdit,window.location.href, "yo")
    const payload = {
      name: workflowName,
      config: {
        nodes,
        edges,
      },
    };
    if (isEdit) {
      console.log(payload);
      updateWorkflow({ payload, id });
    } else saveWorkFlow(payload);
  };

  const handleExecute = () => {
    navigate(`/workflow/test/${id}`);
  };
  return (
    <div className="flex flex-row h-full workflow">
      <div className="flex-1 flex-col" ref={reactFlowWrapper}>
        <div id="workflowHeader" className="header">
          <div className="info">
            {" "}
            <div className="title">Edit Workflow</div>
            <div className="name">
              <div>Name:</div>
              <Input
                className="input"
                variant="unstyled"
                placeholder="Please provide a name for the workflow"
                value={workflowName}
                w={300}
                _placeholder={{
                  // Set the color for the placeholder text
                  fontSize: "16", // Set the font style (e.g., italic)
                  // You can add more CSS properties as needed
                }}
                h={6}
                fontSize={27}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleSaveWorkflow}>Save</button>
            <button onClick={handleExecute}>Execute</button>
          </div>
        </div>
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
      <div className="drag-container">
        <h3 className="title">Models</h3>
        <ModelsDragMenu onDragStart={onDragStart} models={models} />
      </div>

      {currentSelectedNode && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader backgroundColor="white">
              <HStack className="text-black">
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
                  {(currentSelectedNode.type === "T2I" ||
                    currentSelectedNode.type === "T2TT" ||
                    currentSelectedNode.type === "TI2I" ||
                    currentSelectedNode.type === "T2ST" ||
                    currentSelectedNode.type === "S2ST" ||
                    currentSelectedNode.type === "S2TT" ||
                    currentSelectedNode.type === "T2T" ||
                    currentSelectedNode.type === "PromptGenerator" ||
                    currentSelectedNode.type === "Summarizer" ||
                    currentSelectedNode.type === "Sentiment" ||
                    currentSelectedNode.type === "LanguageDetection") && (
                    <T2TTNodeForm
                      onSubmit={handleNodeEditSubmit}
                      onCancel={handleNodEditCancel}
                      type={currentSelectedNode.type}
                      currentSelectedNode={currentSelectedNode}
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
