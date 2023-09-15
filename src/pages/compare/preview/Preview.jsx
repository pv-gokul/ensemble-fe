import { useEffect } from "react";
import { useCallModelMutation } from "../../../api/baseApi";

const Preview = ({ item, input }) => {
  const [call, { isError, data, isLoading }] = useCallModelMutation();
  useEffect(() => {
    console.log(input);
    if (!input) return;
    call({
      url: item.url,
      data: {
        text: input,
      },
    });
  }, [input]);

  return (
    <div className="result">
      <div className="name">{item.name}</div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <img src={data?.image} alt="result" />
      )}
    </div>
  );
};

export default Preview;
