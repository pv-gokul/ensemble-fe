import { useNavigate } from "react-router-dom";
import { useGetAllWorkflowsQuery } from "../../api/baseApi";
import Banner from "../../components/banner/Banner";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const { data, error, isLoading } = useGetAllWorkflowsQuery();
  const navigate = useNavigate();

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
      <section className="workflow">
        <div className="title">Your Workflows</div>
        <div className="tile-container">
          {data?.body?.map((item) => {
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
      <section className="workflow">
        <div className="title">Templates</div>
      </section>
    </div>
  );
};

export default Home;
