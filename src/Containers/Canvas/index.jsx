import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  ControlButton,
  Background,
  useStoreApi,
  ReactFlowProvider,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from "reactflow";

import { nodeTypes } from "../../Config/nodeTypes";

import { MaximizeIcon } from "../../Components/MaximizeIcon/MaximizeIcon";
import { MinimizeIcon } from "../../Components/MinimizeIcon/MinimizeIcon";
import { Markers } from "../../Components/Markers/Markers";

import {
  edgeClassName,
  edgeMarkerName,
  calculateTargetPosition,
  calculateSourcePosition,
  initializeNodes,
  moveSVGInFront,
  setHighlightEdgeClassName,
  logTablePositions,
  setEdgeClassName,
  calculateEdges,
  loadConfig,
} from "../../Helpers";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";
import "./Style";

const Flow = (props) => {
  const { currentDatabase } = props;
  const initialNodes = initializeNodes(currentDatabase);

  const store = useStoreApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fullscreenOn, setFullScreen] = useState(false);
  const [nodeHoverActive, setNodeHoverActive] = useState(true);

  const onInit = (instance) => {
    const nodes = instance.getNodes();
    const initialEdges = calculateEdges({ nodes, currentDatabase });
    setEdges(() => initialEdges);

    const handleKeyboard = (e) => {
      if (e.ctrlKey && e.key === "p") {
        const nodes = instance.getNodes();

        logTablePositions(nodes);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener("resize", (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.code === "MetaLeft") {
          setNodeHoverActive(false);
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      (e) => {
        if (e.code === "MetaLeft") {
          setNodeHoverActive(true);
        }
      },
      false
    );
  };

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_, node) => {
      if (!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();
      state.addSelectedNodes([node.id]);

      const connectedEdges = getConnectedEdges([node], edges);
      setEdges((eds) => {
        return eds.map((ed) => {
          if (connectedEdges.find((e) => e.id === ed.id)) {
            setHighlightEdgeClassName(ed);
          }

          return ed;
        });
      });
    },
    [edges, nodeHoverActive, setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_, node) => {
      if (!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();

      setEdges((eds) => eds.map((ed) => setEdgeClassName(ed)));

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      document.activeElement.blur();
    },
    [nodeHoverActive, setEdges, store]
  );

  const onSelectionChange = useCallback((params) => {
    const edges = params.edges;
    edges.forEach((ed) => {
      const svg = document
        .querySelector(".react-flow__edges")
        ?.querySelector(`[data-testid="rf__edge-${ed.id}"]`);
      moveSVGInFront(svg);
    });
  }, []);

  const handleNodesChange = useCallback(
    (nodeChanges) => {
      nodeChanges.forEach((nodeChange) => {
        if (nodeChange.type === "position" && nodeChange.positionAbsolute) {
          // nodeChange.positionAbsolute contains new position
          const node = nodes.find((node) => node.id === nodeChange.id);

          if (!node) {
            return;
          }

          const incomingNodes = getIncomers(node, nodes, edges);
          incomingNodes.forEach((incomingNode) => {
            const edge = edges.find((edge) => {
              return edge.id === `${incomingNode.id}-${node.id}`;
            });

            const edgeConfig = currentDatabase.edgeConfigs.find(
              (edgeConfig) => {
                return (
                  edgeConfig.source === incomingNode.id &&
                  edgeConfig.target === node.id
                );
              }
            );

            if (nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if (edge && ed.id === edge.id) {
                    const sourcePosition =
                      edgeConfig.sourcePosition ||
                      calculateSourcePosition(
                        incomingNode.width,
                        incomingNode.position.x,
                        node.width,
                        nodeChange.positionAbsolute.x
                      );
                    const targetPosition =
                      edgeConfig.targetPosition ||
                      calculateTargetPosition(
                        incomingNode.width,
                        incomingNode.position.x,
                        node.width,
                        nodeChange.positionAbsolute.x
                      );

                    const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition}`;
                    const targetHandle = `${edgeConfig.targetKey}-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              );
            }
          });

          const outgoingNodes = getOutgoers(node, nodes, edges);
          outgoingNodes.forEach((targetNode) => {
            const edge = edges.find((edge) => {
              return edge.id === `${node.id}-${targetNode.id}`;
            });

            const edgeConfig = currentDatabase.edgeConfigs.find(
              (edgeConfig) => {
                return (
                  edgeConfig.source === nodeChange.id &&
                  edgeConfig.target === targetNode.id
                );
              }
            );

            if (nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if (edge && ed.id === edge.id) {
                    const sourcePosition =
                      edgeConfig.sourcePosition ||
                      calculateSourcePosition(
                        node.width,
                        nodeChange.positionAbsolute.x,
                        targetNode.width,
                        targetNode.position.x
                      );
                    const targetPosition =
                      edgeConfig.targetPosition ||
                      calculateTargetPosition(
                        node.width,
                        nodeChange.positionAbsolute.x,
                        targetNode.width,
                        targetNode.position.x
                      );

                    const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition}`;
                    const targetHandle = `${edgeConfig.targetKey}-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              );
            }
          });
        }
      });

      onNodesChange(nodeChanges);
    },
    [onNodesChange, setEdges, nodes, edges, currentDatabase]
  );

  const toggleFullScreen = () => {
    if (fullscreenOn) {
      document
        .exitFullscreen()
        .then(function () {
          setFullScreen(false);
        })
        .catch(function (error) {
          alert("Can't exit fullscreen");
          console.error(error);
        });
    } else {
      var element = document.querySelector("body");

      // make the element go to full-screen mode
      element &&
        element
          .requestFullscreen()
          .then(function () {
            setFullScreen(true);
          })
          .catch(function (error) {
            alert("Can't turn on fullscreen");
            console.error(error);
          });
    }
  };

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow">
      <Markers />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        snapToGrid={true}
        fitView
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onSelectionChange={onSelectionChange}
      >
        <Controls showInteractive={false}>
          <ControlButton onClick={toggleFullScreen}>
            {!fullscreenOn && <MaximizeIcon />}
            {fullscreenOn && <MinimizeIcon />}
          </ControlButton>
        </Controls>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

const Canvas = (props) => {
  const [currentDatabase, setCurrentDatabase] = useState({
    tables: [],
    edgeConfigs: [],
    schemaColors: {},
    tablePositions: {},
  });
  const [databasesLoaded, setDatabasesLoaded] = useState(false);

  useEffect(() => {
    loadConfig().then((data) => {
      if (!data || !data?.tables) {
        return;
      }

      setCurrentDatabase(data);
      setDatabasesLoaded(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ReactFlowProvider>
      {databasesLoaded && <Flow currentDatabase={currentDatabase} />}
    </ReactFlowProvider>
  );
};

export default Canvas;
