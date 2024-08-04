import { FLOW_VIEWS } from "../constants/flow";
import { calculateSourcePosition } from "./calculateSourcePosition";
import { calculateTargetPosition } from "./calculateTargetPosition";
import { edgeClassName } from "./edgeClassName";
import { edgeMarkerName } from "./edgeMarkerName";

export const calculateEdges = (nodes, currentDatabase, flowView) => {
  // this will be replaced with multiple views
  if (flowView === FLOW_VIEWS.COLUMN) {
    return calculateEdgesTableColumn(nodes, currentDatabase);
  } else {
    return calculateEdgesTable(nodes, currentDatabase);
  }
};

const calculateEdgesTableColumn = (nodes, currentDatabase) => {
  const initialEdges = [];

  if (!currentDatabase?.edgeConfigs) return;
  if (!nodes || nodes?.length === 0) return;

  currentDatabase.edgeConfigs.forEach((edgeConfig) => {
    const sourceNode = nodes.find((node) => node.id === edgeConfig.source);
    const targetNode = nodes.find((node) => node.id === edgeConfig.target);

    if (sourceNode && targetNode) {
      const sourcePosition =
        edgeConfig.sourcePosition ||
        calculateSourcePosition(
          sourceNode.width,
          sourceNode.position.x,
          targetNode.width,
          targetNode.position.x
        );
      const targetPosition =
        edgeConfig.targetPosition ||
        calculateTargetPosition(
          sourceNode.width,
          sourceNode.position.x,
          targetNode.width,
          targetNode.position.x
        );

      const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition}`;
      const targetHandle = `${edgeConfig.targetKey}-${targetPosition}`;

      initialEdges.push({
        id: `${edgeConfig.source}-${edgeConfig.target}`,
        source: edgeConfig.source,
        target: edgeConfig.target,
        sourceHandle,
        targetHandle,
        type: "smoothstep",
        markerEnd: edgeMarkerName(edgeConfig, targetPosition),
        className: edgeClassName(edgeConfig, targetPosition),
      });
    }
  });

  return initialEdges;
};

const calculateEdgesTable = (nodes, currentDatabase) => {
  const initialEdges = [];

  currentDatabase.edgeConfigs.forEach((edgeConfig) => {
    const id = `${edgeConfig.source}-${edgeConfig.target}`;

    const sourceNode = nodes.find((node) => node.id === edgeConfig.source);
    const targetNode = nodes.find((node) => node.id === edgeConfig.target);

    if (sourceNode && targetNode) {
      const sourcePosition =
        edgeConfig.sourcePosition ||
        calculateSourcePosition(
          sourceNode.width,
          sourceNode.position.x,
          targetNode.width,
          targetNode.position.x
        );
      const targetPosition =
        edgeConfig.targetPosition ||
        calculateTargetPosition(
          sourceNode.width,
          sourceNode.position.x,
          targetNode.width,
          targetNode.position.x
        );

      const sourceHandle = `source-header-${sourcePosition}`;
      const targetHandle = `target-header-${targetPosition}`;

      initialEdges.push({
        id: id,
        source: edgeConfig.source,
        target: edgeConfig.target,
        sourceHandle,
        targetHandle,
        type: "smoothstep",
        markerEnd: edgeMarkerName(edgeConfig, targetPosition),
        className: edgeClassName(edgeConfig, targetPosition),
      });
    }
  });

  return initialEdges;
};
