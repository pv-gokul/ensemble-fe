/* eslint-disable react/prop-types */
import { UilTrashAlt } from '@iconscout/react-unicons'


const NodeMenuWrapper = ({ children, data }) => {
  return (
    <div className="group">
      <div className="group w-full pb-1 pr-1 absolute -top-7 right-0 flex flex-row justify-end invisible group-hover:visible">
        <button className='ml-2 bg-gray-300 rounded-md p-1' onClick={(e) => { e.stopPropagation(); data?.onDelete(); }}><UilTrashAlt size="16" /></button>
      </div>
      {children}
    </div>
  );
};

export default NodeMenuWrapper;