/* eslint-disable react/prop-types */
import { Position } from "reactflow";
import CustomNodeHandle from "../custom-node-handle/CustomNodeHandle";
import NodeMenuWrapper from "../node-menu-wrapper/NodeMenuWrapper";
import { UilRocket } from '@iconscout/react-unicons'

function StartNode({ data }) {
  return (
    <>
    <NodeMenuWrapper data={data}>
      <div className="bg-white w-32 border-green-600 border-4 p-2 flex flex-col items-center rounded-l-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <UilRocket size="40" color="#6563FF" />
        </div>
        <div>{data.label}</div>
      </div>
      <CustomNodeHandle type="source" position={Position.Right} />
    </NodeMenuWrapper>
    </>
  );
}

export default StartNode;
