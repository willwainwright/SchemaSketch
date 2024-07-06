export const calculateTargetPosition = (
  sourceNodeWidth,
  sourceNodeX,
  targetNodeWidth,
  targetNodeX
) => {
  if (sourceNodeX > targetNodeX + targetNodeWidth) {
    return "right";
  } else if (
    sourceNodeX > targetNodeX &&
    sourceNodeX < targetNodeX + targetNodeWidth
  ) {
    return "right";
  } else if (sourceNodeX + sourceNodeWidth > targetNodeX) {
    return "left";
  } else {
    return "left";
  }
};
