/* eslint-disable react/prop-types */
import { useCallback, useMemo } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import StartNode from "../nodes/start-node/StartNode";
import EndNode from "../nodes/end-node/EndNode";
import IfNode from "../nodes/if-node/IfNode";
import CodeNode from "../nodes/code-node/CodeNode";
import HttpsNode from "../nodes/https-node/HttpsNode";
import T2TTNode from "../nodes/T2TTNode/T2TTNode";

const WorkflowCreationSection = ({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  handleOnConnect,
  onNodeClick,
  setReactFlowInstance,
  onDrop,
  onDragOver,
}) => {
  const nodeTypes = useMemo(
    () => ({
      T2TT: T2TTNode,
      startNode: StartNode,
      endNode: EndNode,
      ifNode: IfNode,
      codeNode: CodeNode,
      httpsNode: HttpsNode,
    }),
    []
  );

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
      onNodeClick={(_, node) => onNodeClick(node)}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Background variant={BackgroundVariant.Lines} gap={12} size={1.5} />
    </ReactFlow>
  );
};

export default WorkflowCreationSection;
