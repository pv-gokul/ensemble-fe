import { useCallback, useMemo } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import StartNode from "../nodes/start-node/StartNode";
import EndNode from "../nodes/end-node/EndNode";

const WorkflowCreationSection = ({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  handleOnConnect
}) => {
  const nodeTypes = useMemo(() => ({ startNode: StartNode, endNode: EndNode }), []);

  const onConnect = useCallback((params) => {
    handleOnConnect(params);
  }, []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background variant={BackgroundVariant.Lines} gap={12} size={1.5} />
    </ReactFlow>
  );
};

export default WorkflowCreationSection;
