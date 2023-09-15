import { useEffect } from "react";
import {
  useGetAllWorkflowsQuery,
  useGetAvailableModelsQuery,
} from "../../api/baseApi";
import {
  Switch,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { generalModels } from "../../contants/constans";
import { MarkerType } from "reactflow";

const headings = ["Name", "Created On", "Last Updated", "Status"];

const AI_RESPONSE = "S2TT, Summarizer";

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

const Console = () => {
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const { data: modelsList } = useGetAvailableModelsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (modelsList && modelsList.body) {
      const resultNodes = [];
      const resultEdges = [];
      const splittedArray = getNodesFromAiResponse(AI_RESPONSE);
      let y = 300;
      let x = 100;
      let lastNode = createNode({
        position: { x, y },
        type: "startNode",
        label: "Start",
      });
      resultNodes.push(lastNode);
      splittedArray.forEach((chatGptGenNode) => {
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
      console.log(resultNodes);
      console.log(resultEdges);
    }
  }, [modelsList]);

  const handleCreate = () => {
    navigate("/workflow/create");
  };

  const handleEdit = (id) => {
    navigate(`/workflow/edit/${id}`);
  };

  const handleDelete = () => {};

  return (
    <div className="console">
      <span className="nav-info">Home > Console</span>
      <div className="header">
        <div className="title">Your Workflows</div>
        <button onClick={handleCreate}>Create a workflow</button>
      </div>
      <div className="sub-head">Comprehensively manage your workflows here</div>

      <table className="min-w-full text-left text-sm font-light">
        <thead>
          <tr>
            {headings.map((item) => (
              <th key={item} scope="col" className="px-6 py-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.body?.map((item) => {
            return (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">Cell</td>
                <td className="whitespace-nowrap px-6 py-4">Cell</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Switch id="email-alerts" />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Popover>
                    <PopoverTrigger>
                      <button style={{ float: "right" }}>
                        <FaEllipsisV />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent style={{ marginRight: "24px" }}>
                      <PopoverBody className="menu">
                        <span onClick={() => handleEdit(item.id)}>Edit</span>
                        <span onClick={handleDelete}>Delete</span>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Console;
