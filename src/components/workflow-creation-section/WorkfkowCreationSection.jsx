/* eslint-disable react/prop-types */
import { useCallback, useMemo } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import StartNode from "../nodes/start-node/StartNode";
import EndNode from "../nodes/end-node/EndNode";
import IfNode from "../nodes/if-node/IfNode";
import CodeNode from "../nodes/code-node/CodeNode";
import HttpsNode from "../nodes/https-node/HttpsNode";
import T2TTNode from "../nodes/T2TTNode/T2TTNode";
import T2INode from "../nodes/T2INode/T2INode";
import TI2INode from "../nodes/TI2INode/TI2INode";
import T2STNode from "../nodes/T2STNode/T2STNode";
import S2STNode from "../nodes/S2STNode/S2STNode";
import S2TTNode from "../nodes/S2TTNode/S2TTNode";
import AiNode from "../nodes/AiNodes/AiNode";

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
      LanguageDetection: AiNode,
      Sentiment: AiNode,
      Summarizer: AiNode,
      PromptGenerator: AiNode,
      T2T: AiNode,
      S2TT: AiNode,
      S2ST: AiNode,
      T2ST: AiNode,
      TI2I: AiNode,
      T2TT: AiNode,
      T2I: AiNode,
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
      fitView
    >
      <Background variant={BackgroundVariant.Lines} gap={12} size={1.5} />
    </ReactFlow>
  );
};

export default WorkflowCreationSection;
