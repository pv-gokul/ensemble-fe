import { Handle } from "reactflow";
import { twMerge } from "tailwind-merge";

const CustomNodeHandle = ({ type, position }) => {
  return <Handle type={type} position={position} className={twMerge('w-3 h-3 bg-gray-600', type === 'target' && 'w-3 h-6 rounded-none')} />;
};

export default CustomNodeHandle;