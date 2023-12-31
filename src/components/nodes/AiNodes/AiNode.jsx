/* eslint-disable react/prop-types */
import { Position } from "reactflow";
import CustomNodeHandle from "../custom-node-handle/CustomNodeHandle";
import NodeMenuWrapper from "../node-menu-wrapper/NodeMenuWrapper";
import { getIcon } from "../../../utils/menuData";

function AiNode({ data }) {
  const Icon = getIcon(data?.model?.typeenum);

  return (
    <>
      <CustomNodeHandle type="target" position={Position.Left} />
      <NodeMenuWrapper data={data}>
        <div className="bg-white  border-2 p-2 flex flex-col items-center rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center">
            <Icon size="40" color="#fcba03" />
          </div>
          <div className="text-center">{data.model.type}</div>
          <div className="text-sm text-gray-400">{data.name}</div>
        </div>
      </NodeMenuWrapper>
      <CustomNodeHandle type="source" position={Position.Right} />
    </>
  );
}

export default AiNode;
