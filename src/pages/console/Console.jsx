import { useEffect } from "react";
import { useGetAllWorkflowsQuery } from "../../api/baseApi";
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
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const headings = ["Name", "Created On", "Last Updated", "Status"];

const Console = () => {
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
              <th scope="col" className="px-6 py-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.body?.map((item) => {
            return (
              <tr>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">Cell</td>
                <td className="whitespace-nowrap px-6 py-4">Cell</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Switch id="email-alerts" isChecked={true} />
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
