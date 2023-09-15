import { useEffect, useState } from "react";
import { useGetAllWorkflowsQuery, useLazyGetWorkflowByIdQuery, useSaveWorkflowMutation } from "../../api/baseApi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FieldWrapper from "../../components/FieldWapper/FieldWrapper";

const headings = ["Name", "Created On", "Last Updated", "Status"];

export const TEMPLATES_LIST = [
  {
    name: "Convert audio to text",
    description:
      "Effortlessly transcribe audio into text with our Audio to Text Translator template. Save time and enhance your workflow.",
  },
  {
    name: "Customized product background",
    description:
      "Create personalized product backgrounds with ease using our Custom Background Generator model.",
  },
];

const TemplatesList = () => {
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const [saveWorkFlow] = useSaveWorkflowMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getWorkflowDetails, { isLoading: getWorkflowDetailsIsLoading }] = useLazyGetWorkflowByIdQuery();
  const [selectedTemplateId ,setSelectedTemplateId] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/workflow/create");
  };

  const handleEdit = (id) => {
    navigate(`/workflow/edit/${id}`);
  };

  const TEMPLATES_LIST = [
    {
      name: "Convert audio to text",
      description:
        "Effortlessly transcribe audio into text with our Audio to Text Translator template. Save time and enhance your workflow.",
      id: '1',
    },
    {
      name: "Customized product background",
      description:
        "Create personalized product backgrounds with ease using our Custom Background Generator model.",
      id: '2',
    },
    {
      name: "Sentiment analysis of YouTube comments",
      description: "Instantly analyze YouTube comments with our Sentiment Analysis AI.",
      // id: '/workflow/edit/29'
      id: '29'
    }
  ];

  const handleDelete = () => {};

  const handleCreateCopy = (id) => {
    onOpen();
    setSelectedTemplateId(id);
  };

  const handleCreateCopyWithExistingData = async () => {
    try {
      const res = await getWorkflowDetails(selectedTemplateId);
      console.log(res);
      const newWorkflowBody = {
        name: newWorkflowName,
        config: res.data.body.config,
      };
      console.log(newWorkflowBody);
      const saveWorkflowResult = await saveWorkFlow(newWorkflowBody);
      console.log(saveWorkflowResult);
      if (saveWorkflowResult.data.body.id) {
        navigate(`/workflow/edit/${saveWorkflowResult.data.body.id}`)
      }

    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="console">
      <span className="nav-info">Home > Templates</span>
      <div className="header">
        <div className="title">Workflow Templates</div>
      </div>
      <div className="sub-head mt-1">
        Create workflows using the predefined templates
      </div>

      <div className="mt-4 flex gap-6">
        {TEMPLATES_LIST.map((item) => {
          return (
            <Card key={item.name} className="w-96">
              <CardHeader>
                <div className="text-xl">{item.name}</div>
              </CardHeader>
              <CardBody>
                <div className="text-gray-500">{item.description}</div>
              </CardBody>
              <CardFooter>
                <div className="flex flex-row flex-1 justify-end">
                  <Button className="mr-2">Test</Button>
                  {/* <Button onClick={() => item.onClickHandle ? navigate(item.onClickHandle) : null}>Create Copy</Button> */}
                  <Button onClick={() => handleCreateCopy(item.id)}>Create Copy</Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader backgroundColor="white">
              <div className="text-black">Enter Workflow Name</div>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="pb-2">
                <FieldWrapper label="Name">
                  <Input value={newWorkflowName} onChange={(e) => setNewWorkflowName(e.target.value)} />
                </FieldWrapper>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleCreateCopyWithExistingData}>Create Copy</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  );
};

export default TemplatesList;
