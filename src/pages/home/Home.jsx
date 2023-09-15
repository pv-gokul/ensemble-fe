import { useNavigate } from "react-router-dom";
import {
  useGetAllTemplatesQuery,
  useGetAllWorkflowsQuery,
} from "../../api/baseApi";
import Banner from "../../components/banner/Banner";
import { FaPlus } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import { TEMPLATES_LIST } from "../templates-list/TemplatesList";

const Home = () => {
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
            <div className="item create-btn">
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
    </div>
  );
};

export default Home;
