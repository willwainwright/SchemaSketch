import { Button, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import { useOnViewportChange, useReactFlow, useViewport } from "reactflow";

const useStyles = makeStyles({
  BottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "30px",
    boxShadow: tokens.shadow4,
    backgroundColor: "green",
    zIndex: "10",
  },
});

const BottomBar = () => {
  const [showPositions, setShowPositions] = useState(false);

  // Hooks
  const styles = useStyles();
  const { x, y, zoom } = useViewport();
  const { zoomIn } = useReactFlow();

  useOnViewportChange({
    onStart: () => setShowPositions(true),
    onEnd: () => setShowPositions(false),
  });

  return (
    <div className={styles.BottomBar}>
      <Button onClick={zoomIn}>Zoom</Button>
      {showPositions && (
        <>
          <p>
            ({x.toFixed(2)}, {y.toFixed(2)})
          </p>
          <p>{zoom}</p>
        </>
      )}
    </div>
  );
};

export default BottomBar;
