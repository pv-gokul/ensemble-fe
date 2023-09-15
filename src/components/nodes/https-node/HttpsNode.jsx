/* eslint-disable react/prop-types */
import { Position } from 'reactflow';
import CustomNodeHandle from '../custom-node-handle/CustomNodeHandle';
import NodeMenuWrapper from '../node-menu-wrapper/NodeMenuWrapper';
import { UilGlobe } from '@iconscout/react-unicons';


function HttpsNode({ data }) {
  return (
    <>
      <CustomNodeHandle type="target" position={Position.Left} />
      <NodeMenuWrapper data={data}>
        <div className="bg-white w-32 border-green-600 border-4 p-2 flex flex-col items-center rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center">
            <UilGlobe size="40" color="#0356fc" />
          </div>
          <div>{data.label}</div>
        </div>
      </NodeMenuWrapper>
      <CustomNodeHandle type="source" position={Position.Right} />
    </>
  );
}

export default HttpsNode;
