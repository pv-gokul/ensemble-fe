import { useEffect } from "react";
import { useGetAllWorkflowsQuery } from "../../api/baseApi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/workflow/create");
  };

  const handleEdit = (id) => {
    navigate(`/workflow/edit/${id}`);
  };

  const handleDelete = () => {};

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
            <Card className="w-96">
              <CardHeader>
                <div className="text-xl">{item.name}</div>
              </CardHeader>
              <CardBody>
                <div className="text-gray-500">{item.description}</div>
              </CardBody>
              <CardFooter>
                <div className="flex flex-row flex-1 justify-end">
                  <Button className="mr-2">Test</Button>
                  <Button>Create Copy</Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesList;
