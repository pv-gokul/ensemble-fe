/* eslint-disable react/prop-types */
import { Position } from 'reactflow';
import CustomNodeHandle from '../custom-node-handle/CustomNodeHandle';
import NodeMenuWrapper from '../node-menu-wrapper/NodeMenuWrapper';
import { UilTextFields } from '@iconscout/react-unicons'


function AiNode({ data }) {
  return (
    <>
      <CustomNodeHandle type="target" position={Position.Left} />
      <NodeMenuWrapper data={data}>
        <div className="bg-white border-green-600 border-4 p-2 flex flex-col items-center rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center">
            <UilTextFields size="40" color="#fcba03" />
          </div>
          <div className='text-center'>{data.model.type}</div>
          <div className='text-sm text-gray-400'>{data.name}</div>
        </div>
      </NodeMenuWrapper>
      <CustomNodeHandle type="source" position={Position.Right} />
    </>
  );
}

export default AiNode;
