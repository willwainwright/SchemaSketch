import { edgeMarkerName } from "./edgeMarkerName";
import { edgeClassName } from "./edgeClassName";
import { calculateSourcePosition } from "./calculateSourcePosition";
import { calculateTargetPosition } from "./calculateTargetPosition";

export const calculateEdges = ({ nodes, currentDatabase }) => {
  const initialEdges = [];

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
