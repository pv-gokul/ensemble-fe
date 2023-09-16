import { useNavigate } from "react-router-dom";
import {
  useGetAllTemplatesQuery,
  useGetAllWorkflowsQuery,
  useGenerateAiWorkFlowMutation,
  useGetAvailableModelsQuery,
  useSaveWorkflowMutation,
} from "../../api/baseApi";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Switch,
  Input,
  Text,
} from "@chakra-ui/react";
import Banner from "../../components/banner/Banner";
import { FaPlus } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import { TEMPLATES_LIST } from "../templates-list/TemplatesList";
import { useState } from "react";
import "./styles.scss";
import { MarkerType } from "reactflow";
import { getIcon, getIconColor } from "../../utils/menuData";

const Home = () => {
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const { data: modelsList } = useGetAvailableModelsQuery();
  const [getAiWorkflow] = useGenerateAiWorkFlowMutation();
  const [saveWorkFlow] = useSaveWorkflowMutation();
  const navigate = useNavigate();
  const {
    data: workflows,
    error: workflowsError,
    isLoading: workflowsLoading,
  } = useGetAllWorkflowsQuery();
  const {
    data: templates,
    error: templatesError,
    isLoading: templatesLoading,
  } = useGetAllTemplatesQuery();

  const [openModal, setOpenModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [name, setName] = useState("");
  const [aiPromptData, setAiPromptData] = useState("");

  // Define options for formatting
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  };

  const handleClick = (item) => {
    navigate(`/workflow/test/${item.id}`);
  };

  const handleAddWorkflowClick = () => {
    setOpenModal(true);
  };

  const getNodesFromAiResponse = (res = "") => {
    const cleanedData = res.replace(/\s/g, "");
    return cleanedData.split(",");
  };

  const createNode = ({ position, type, label, model }) => {
    const nodeId = uuidv4();
    const newNode = {
      id: nodeId,
      position,
      data: {
        label,
        model,
      },
      type,
    };
    return newNode;
  };

  const createEdge = (source, target) => {
    const edge = {
      id: `${source}-${target}`,
      source: source,
      target: target,
      type: "smoothstep",
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
    };

    return edge;
  };

  const handleSubmitCreate = async () => {
    if (aiEnabled) {
      const result = await getAiWorkflow({ text: aiPromptData });
      const nodes = getNodesFromAiResponse(result.data.body.text);

      if (modelsList && modelsList.body) {
        const resultNodes = [];
        const resultEdges = [];
        let y = 300;
        let x = 100;
        let lastNode = createNode({
          position: { x, y },
          type: "startNode",
          label: "Start",
        });
        resultNodes.push(lastNode);
        nodes.forEach((chatGptGenNode) => {
          x += 200;
          const firstModelWithType = modelsList.body.find(
            (item) => item.typeenum === chatGptGenNode
          );
          let currentNode = createNode({
            position: { x, y },
            type: chatGptGenNode,
            label: firstModelWithType.type,
            model: firstModelWithType,
          });
          resultNodes.push(currentNode);
          let newEdge = createEdge(lastNode.id, currentNode.id);
          resultEdges.push(newEdge);
          lastNode = currentNode;
        });
        x += 200;
        let endNode = createNode({
          position: { x, y },
          type: "endNode",
          label: "End",
        });
        resultNodes.push(endNode);
        let newEdge = createEdge(lastNode.id, endNode.id);
        resultEdges.push(newEdge);

        const payload = {
          name,
          config: {
            nodes: resultNodes,
            edges: resultEdges,
          },
        };
        const workflowData = await saveWorkFlow(payload);
        navigate(`/workflow/edit/${workflowData.data.body.id}`);
      }
    } else {
      const workflowData = await saveWorkFlow({
        name,
        config: {
          nodes: [],
          edges: [],
        },
      });
      navigate(`/workflow/edit/${workflowData.data.body.id}`);
    }
    setOpenModal(false);
  };

  return (
    <div className="home">
      <Banner />
      <div className="divider" />
      <div className="list">
        <section className="workflow">
          <div className="title">Your Workflows</div>
          <div className="tile-container">
            {workflows?.body?.map((item) => {
              const formattedDate = new Intl.DateTimeFormat(
                "en-US",
                options
              ).format(new Date(item.updatedAt));

              const nodes = item.config.nodes;

              return (
                <div className="item" onClick={() => handleClick(item)}>
                  <div className="images flex gap-2">
                    {nodes.map((node) => {
                      const Icon = node.type!== 'startNode' && node.type!= 'endNode' && getIcon(node.type)
                        return (
                          Icon && <Icon size={20} color={getIconColor(node.type)}/>
                        );
                    })}
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="update">Updated on {formattedDate}</div>
                </div>
              );
            })}
            <div className="item create-btn" onClick={handleAddWorkflowClick}>
              <FaPlus color="blue" size={30} />
            </div>
          </div>
        </section>
        {/* <section className="workflow">
          <div className="title">Templates</div>
          <div className="tile-container">
            {(templates?.body || TEMPLATES_LIST).map((template) => (
              <div className="item template relative">
                <AiOutlineCopy className="text-2xl absolute right-4 top-4 copy" />
                <div className="flex flex-col items-center justify-center h-full text-white font-semibold">
                  {template.name}
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            className="rounded"
            backgroundColor="white"
            color="black"
          >
            Create a new workflow
          </ModalHeader>
          <ModalCloseButton />
          {/* <hr class="h-px my-8 bg-gray-300 border-0 my-0 mx-6" /> */}
          <ModalBody>
            <>
              <Text mb="8px">Workflow name</Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workflow name"
                size="md"
              />
            </>
            <div className="ai-toggle-wrapper py-5">
              <div className="ai-toggle-label">Create with AI</div>
              <Switch
                onChange={() => setAiEnabled((prev) => !prev)}
                value={aiEnabled}
              />
            </div>
            {aiEnabled && (
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none pb-20"
                placeholder="Enter a prompt for the AI to generate a workflow"
                onChange={(e) => setAiPromptData(e.target.value)}
              />
            )}
            <div className="create-flow-button" onClick={handleSubmitCreate}>
              Create
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
