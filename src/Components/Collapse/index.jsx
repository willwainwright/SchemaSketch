import { makeStyles, mergeClasses } from "@fluentui/react-components";

import React from "react";

const useStyles = makeStyles({
  contentWrapper: {
    display: "grid",
    gridTemplateRows: "0fr",
    transition: `grid-template-rows 0.2s ease-out`,
  },

  contentWrapperIsOpen: {
    gridTemplateRows: "1fr",
  },
  contentInner: {
    overflow: "hidden",
  },
});

const Collapse = (props) => {
  const { children, isOpen } = props;

  // Hooks
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.contentWrapper,
        isOpen && styles.contentWrapperIsOpen
      )}
    >
      <div className={styles.contentInner}>{children}</div>
    </div>
  );
};

export default Collapse;
