import { useNodesState, useEdgesState, MarkerType } from "reactflow";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

import WorkflowCreationSection from "../../components/workflow-creation-section/WorkfkowCreationSection";
import { useGetPokemonByNameQuery } from "../../api/baseApi";

const initialNodes = [];
const initialEdges = [];

const models = [
  { key: "startNode", label: "Start" },
  { key: "endNode", label: "End" },
  { key: "ifNode", label: "IF" },
  { key: "codeNode", label: 'Code' },
  { key: "httpsNode", label: 'Https' }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);

  const { data } = useGetPokemonByNameQuery();

  const handleOnConnect = useCallback(
    (params) => {
      console.log({ params });
      setEdges((eds) => [
        ...eds,
        {
          id: `${params.source}-${params.target}`,
          source: params.source,
          sourceHandle: params.sourceHandle,
          target: params.target,
          type: "smoothstep",
          // TODO: if at all label is needed
          // label: "smoothstep"
          // for arrow tip at the end of the node
          style: {
            strokeWidth: 1.5,
            stroke: "#808080",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#808080",
            strokeWidth: 1.5,
          },
        },
      ]);
    },
    [setEdges]
  );

  const handleNodeDeleteClick = (id) => {
    console.log({ id });
    setNodes((prev) => {
      console.log(prev);
      return prev.filter((item) => item.id !== id);
    })
  };

  const onCustomNodeAdd = (key) => {
    const nodeDetail = models.find((item) => item.key === key);
    const id = uuidv4();
    setNodes((nds) => [
      ...nds,
      {
        id,
        position: { x: 300, y: 100 },
        data: { label: nodeDetail?.label || "", onDelete: () => handleNodeDeleteClick(id) },
        type: key,
      },
    ]);
  };

  const handleNodeClick = (node) => {
    setCurrentSelectedNode(node);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="flex flex-row">
      <div className="bg-blue-300 p-5">
        <h3 className="text-lg pb-3">Models</h3>
        <div>
          {models.map((item) => {
            return (
              <div
                className=""
                key={item.key}
                onClick={() => onCustomNodeAdd(item.key)}
              >
                <h4>{item.label}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <WorkflowCreationSection
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        handleOnConnect={handleOnConnect}
        onNodeClick={handleNodeClick}
      />
      {currentSelectedNode && (
        <div className="p-2 bg-blue-200 cursor-pointer">
          <div onClick={() => setCurrentSelectedNode(null)}>
            X
          </div>
          Menu
        </div>
      )}
    </div>
  );
}

export default App;
