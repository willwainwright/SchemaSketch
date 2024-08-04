import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import {
  PanelRightExpandFilled,
  PanelRightExpandRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useStoreApi,
} from "reactflow";

import { Markers } from "../../components/Markers/Markers";
import { MaximizeIcon } from "../../components/MaximizeIcon/MaximizeIcon";
import { MinimizeIcon } from "../../components/MinimizeIcon/MinimizeIcon";
import { nodeTypes } from "../../config/nodeTypes";
import { useCanvasSettings } from "../../context/CanvasSettingsContext";
import {
  calculateEdges,
  calculateSourcePosition,
  calculateTargetPosition,
  edgeClassName,
  edgeMarkerName,
  initializeNodes,
  loadConfig,
  setEdgeClassName,
  setHighlightEdgeClassName,
} from "../../helpers";
import PanelLeft from "../PanelLeft";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";
import { FLOW_VIEWS } from "../../constants/flow";
import { SELECTED_TYPE } from "../../constants/panel";
import "./Style";

const PanelRightIcon = bundleIcon(
  PanelRightExpandFilled,
  PanelRightExpandRegular
);

const useStyles = makeStyles({
  flow: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    fontSize: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  buttonToggled: {
    backgroundColor: tokens.colorNeutralBackground1Pressed,

    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
});

const Flow = (props) => {
  const { currentDatabase } = props;
  const initialNodes = initializeNodes(currentDatabase, false);

  // eslint-disable-next-line
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fullscreenOn, setFullScreen] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});
  const store = useStoreApi();

  const { theme, flowView, toggleShowColumns } = useCanvasSettings();

  const styles = useStyles();
  const onInit = (instance) => {
    const nodes = instance.getNodes();
    const initialEdges = calculateEdges(nodes, currentDatabase, flowView);

    setEdges(() => initialEdges);

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener("resize", (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });
  };

  useEffect(() => {
    const updatedNodes = nodes.map((node) => ({
      ...node,
      type: flowView === FLOW_VIEWS.TABLE ? "table" : "tableColumn",
    }));

    const updatedEdges = calculateEdges(
      updatedNodes,
      currentDatabase,
      flowView
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowView, currentDatabase]);

  useEffect(() => {
    const selectedNode = nodes && nodes.find((node) => node.selected === true);
    console.log("selectedNode", selectedNode);
    if (selectedNode?.id) {
      setSelectedNode(selectedNode);
      setLeftPanelOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  const tableMode = () => {
    toggleShowColumns();
  };

  const onNodeMouseEnter = (_, node) => {
    if (!node || !edges.length) return;

    const connectedEdges = getConnectedEdges([node], edges);
    setEdges((eds) => {
      return eds.map((ed) => {
        if (connectedEdges.find((e) => e.id === ed.id)) {
          setHighlightEdgeClassName(ed);
        }

        return ed;
      });
    });
  };

  const onNodeMouseLeave = useCallback(
    (_, node) => {
      if (!node) return;

      setEdges((eds) => eds.map((ed) => setEdgeClassName(ed)));

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      document.activeElement.blur();
    },
    [setEdges]
  );

  const handleNodesChange = (nodes) => {
    if (flowView === FLOW_VIEWS.COLUMN) {
      recalculateEdgePositions(nodes);
    } else {
      return onNodesChange(nodes);
    }
  };

  // This moves the edge to use the other side node on rearrange
  const recalculateEdgePositions = useCallback(
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

  // TODO make this work with rtight
  const togglePanel = (side) => {
    if (leftPanelOpen) {
      const state = store.getState();
      state.resetSelectedElements();
      setSelectedNode({});
      setLeftPanelOpen(false);
    } else {
      setLeftPanelOpen(true);
    }
  };

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <>
      <PanelLeft
        open={leftPanelOpen}
        togglePanel={() => togglePanel("left")}
        selectedItem={selectedNode}
        selectedItemType={SELECTED_TYPE.NODE}
      />

      <div className={styles.flow}>
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
          proOptions={{ hideAttribution: true }}
        >
          <Controls
            position={"bottom-center"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <ControlButton onClick={toggleFullScreen}>
              {!fullscreenOn && <MaximizeIcon />}
              {fullscreenOn && <MinimizeIcon />}
            </ControlButton>

            <ControlButton
              onClick={() => tableMode()}
              className={mergeClasses(styles.buttonToggled)}
            >
              <PanelRightIcon />
            </ControlButton>
          </Controls>

          <Background color={theme.colorNeutralBackgroundInverted} gap={16} />
        </ReactFlow>
      </div>
    </>
  );
};

const Canvas = () => {
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

  return <>{databasesLoaded && <Flow currentDatabase={currentDatabase} />}</>;
};

export default Canvas;
