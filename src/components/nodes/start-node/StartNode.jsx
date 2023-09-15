import { Position } from "reactflow";
import CustomNodeHandle from "../custom-node-handle/CustomNodeHandle";

function StartNode({ data }) {
  return (
    <>
      <div className="bg-white w-32 border-green-600 border-4 p-2 flex flex-col items-center rounded-l-xl">
        <div className="w-12 h-12 flex items-center justify-center">icon</div>
        <div>{data.label}</div>
      </div>
      <CustomNodeHandle type="source" position={Position.Right} />
    </>
  );
}

export default StartNode;
