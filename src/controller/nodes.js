import { getIncomers, getOutgoers } from "reactflow";

export const updateNodePosition = () => {
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

        const edgeConfig = currentDatabase.edgeConfigs.find((edgeConfig) => {
          return (
            edgeConfig.source === incomingNode.id &&
            edgeConfig.target === node.id
          );
        });

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

        const edgeConfig = currentDatabase.edgeConfigs.find((edgeConfig) => {
          return (
            edgeConfig.source === nodeChange.id &&
            edgeConfig.target === targetNode.id
          );
        });

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
};
