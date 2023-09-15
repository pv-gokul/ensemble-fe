import { useNavigate } from "react-router-dom";
import {
  useGetAllTemplatesQuery,
  useGetAllWorkflowsQuery,
  useGenerateAiWorkFlowMutation,
} from "../../api/baseApi";
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

const Home = () => {
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const [getAiWorkflow] = useGenerateAiWorkFlowMutation();
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

  const handleSubmitCreate = async () => {
    const result = await getAiWorkflow({ text: aiPromptData });
    console.log(result);

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
            {workflows?.body?.slice(0, 5).map((item) => {
              const formattedDate = new Intl.DateTimeFormat(
                "en-US",
                options
              ).format(new Date(item.updatedAt));

              const nodes = item.config.nodes;

              return (
                <div className="item" onClick={() => handleClick(item)}>
                  <div className="images">
                    {/* {nodes.map((node) => {
                      const image = node.data?.model?.id;
                      console.log(image);
                      if (image) {
                        return (
                          <img src={`public/images/${image}.webp`} alt="node" />
                        );
                      }
                    })} */}
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
          <hr class="h-px my-8 bg-gray-300 border-0 my-0 mx-6" />
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
