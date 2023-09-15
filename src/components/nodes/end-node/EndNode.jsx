/* eslint-disable react/prop-types */
import { Position } from "reactflow";
import CustomNodeHandle from "../custom-node-handle/CustomNodeHandle";
import NodeMenuWrapper from "../node-menu-wrapper/NodeMenuWrapper";
import { UilStopCircle } from '@iconscout/react-unicons'

function EndNode({ data }) {
  return (
    <>
    <NodeMenuWrapper data={data}>
      <CustomNodeHandle
        type="target"
        position={Position.Left}
      />
      <div className="bg-white w-32 border-green-600 border-4 p-2 flex flex-col items-center rounded-r-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <UilStopCircle size="40" color="#fc4e03" />
        </div>
        <div>{data.label}</div>
      </div>
    </NodeMenuWrapper>
    </>
  );
}

export default EndNode;
