/* eslint-disable react/prop-types */
import { Position } from 'reactflow';
import CustomNodeHandle from '../custom-node-handle/CustomNodeHandle';
import NodeMenuWrapper from '../node-menu-wrapper/NodeMenuWrapper';
import { UilArrowsLeftDown } from '@iconscout/react-unicons'


function IfNode({ data }) {
  return (
    <>
      <CustomNodeHandle type="target" position={Position.Left} />
      <NodeMenuWrapper data={data}>
        <div className="bg-white w-32 border-green-600 border-4 p-2 flex flex-col items-center rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center">
            <UilArrowsLeftDown size="40" color="#fc037f" />
          </div>
          <div>{data.label}</div>
        </div>
      </NodeMenuWrapper>
      <CustomNodeHandle type="source" position={Position.Right} id="a" style={{ top: 25 }} />
      <CustomNodeHandle type="source" position={Position.Right} id="b" style={{ top: 65 }} />
    </>
  );
}

export default IfNode;
