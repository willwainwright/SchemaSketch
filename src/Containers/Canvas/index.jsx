import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  ControlButton,
  Background,
  useStoreApi,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from "reactflow";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import {
  PanelRightExpandFilled,
  PanelRightExpandRegular,
  PanelLeftExpandFilled,
  PanelLeftExpandRegular,
  bundleIcon,
} from "@fluentui/react-icons";

import { nodeTypes } from "../../config/nodeTypes";
import { MaximizeIcon } from "../../components/MaximizeIcon/MaximizeIcon";
import { MinimizeIcon } from "../../components/MinimizeIcon/MinimizeIcon";
import { Markers } from "../../components/Markers/Markers";
import { useCanvasSettings } from "../../context/CanvasSettingsContext";
import {
  edgeClassName,
  edgeMarkerName,
  calculateTargetPosition,
  calculateSourcePosition,
  initializeNodes,
  moveSVGInFront,
  setHighlightEdgeClassName,
  setEdgeClassName,
  calculateEdges,
  loadConfig,
  calculateEdgesTable,
} from "../../helpers";
import PanelLeft from "../PanelLeft";
import PanelRight from "../PanelRight";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";
import "./Style";

const PanelLeftIcon = bundleIcon(PanelLeftExpandFilled, PanelLeftExpandRegular);
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
  const initialNodes = initializeNodes(currentDatabase);

  const styles = useStyles();
  const { theme } = useCanvasSettings();
  const store = useStoreApi();
  // eslint-disable-next-line
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fullscreenOn, setFullScreen] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const onInit = (instance) => {
    const nodes = instance.getNodes();
    const initialEdges = calculateEdges({ nodes, currentDatabase });

    // const initialEdges = calculateEdgesTable({ nodes, currentDatabase });

    setEdges(() => initialEdges);

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener("resize", (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });
  };

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_, node) => {
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
    [edges, setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_, node) => {
      const state = store.getState();
      state.resetSelectedElements();

      setEdges((eds) => eds.map((ed) => setEdgeClassName(ed)));

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      document.activeElement.blur();
    },
    [setEdges, store]
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

  // This moves the edge to use the other side node on rearrange
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

  const togglePanel = (side) => {
    if (side === "left") {
      setLeftPanelOpen(!leftPanelOpen);
    } else {
      setRightPanelOpen(!rightPanelOpen);
    }
  };

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
    <>
      <PanelLeft open={leftPanelOpen} />
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
          onSelectionChange={onSelectionChange}
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
              onClick={() => togglePanel("left")}
              className={mergeClasses(leftPanelOpen && styles.buttonToggled)}
            >
              <PanelLeftIcon />
            </ControlButton>
            <ControlButton
              onClick={() => togglePanel("right")}
              className={mergeClasses(rightPanelOpen && styles.buttonToggled)}
            >
              <PanelRightIcon />
            </ControlButton>
          </Controls>
          <Background color={theme.colorNeutralBackgroundInverted} gap={16} />
        </ReactFlow>
      </div>
      <PanelRight open={rightPanelOpen} />
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
