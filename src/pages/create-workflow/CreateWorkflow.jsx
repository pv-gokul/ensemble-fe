import { useNodesState, useEdgesState, MarkerType } from "reactflow";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

import WorkflowCreationSection from "../../components/workflow-creation-section/WorkfkowCreationSection";
import { useGetPokemonByNameQuery } from "../../api/baseApi";
import HttpNodeForm from '../../components/node-detail-forms/http-node-form/HttpNodeForm';

const initialNodes = [];
const initialEdges = [];

const models = [
  { key: "startNode", label: "Start" },
  { key: "endNode", label: "End" },
  { key: "ifNode", label: "IF" },
  { key: "codeNode", label: "Code" },
  { key: "httpsNode", label: "Https" },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

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
    });
  };

  const onCustomNodeAdd = (key) => {
    
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeDetail = models.find((item) => item.key === type);
      const id = uuidv4();
      setNodes((nds) => [
        ...nds,
        {
          id,
          position,
          data: {
            label: nodeDetail?.label || "",
            onDelete: () => handleNodeDeleteClick(id),
          },
          type,
        },
      ]);
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleNodeClick = useCallback((node) => {
    setCurrentSelectedNode(node);
  }, []);

  const handleNodeEditSubmit = useCallback((data) => {
      console.log(data);
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-row h-full">
      <div className="bg-blue-300 p-5">
        <h3 className="text-lg pb-3">Models</h3>
        <div>
          {models.map((item) => {
            return (
              <div
                className=""
                key={item.key}
                onClick={() => onCustomNodeAdd(item.key)}
                onDragStart={(event) => onDragStart(event, item.key)}
                draggable
              >
                <h4>{item.label}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1" ref={reactFlowWrapper}>
        <WorkflowCreationSection
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          handleOnConnect={handleOnConnect}
          onNodeClick={handleNodeClick}
          setReactFlowInstance={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>
      {currentSelectedNode && (
        <div className="p-5 bg-slate-300">
          <div onClick={() => setCurrentSelectedNode(null)}>X</div>
          Menu
          <div className="w-72">
            {/* Render form components here */}
            <HttpNodeForm onSubmit={handleNodeEditSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
