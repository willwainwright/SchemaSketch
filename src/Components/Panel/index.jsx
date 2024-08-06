import {
  Button,
  makeStyles,
  mergeClasses,
  Subtitle1,
  tokens,
} from "@fluentui/react-components";
import { TableAddRegular } from "@fluentui/react-icons";
import React, { useEffect, useRef, useState } from "react";

import { PANEL_SIDES } from "../../constants/panel";
import { CollapseIcon, ExpandIcon, SearchIcon } from "../Icons";
import SearchBox from "../SearchBox";

const useStyles = makeStyles({
  panelContainer: {
    position: "absolute",
    paddingBottom: tokens.spacingVerticalSNudge,
    width: "0px",
    height: "calc(100% - 89px)",
    zIndex: 5,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    transition: "width 0.3s ease",
    overflow: "hidden",
  },
  panelOpen: {
    width: "300px",
    display: "block",
    visibility: "visible",
    transition: "width 0.3s ease",
  },

  left: {
    left: "0",
  },
  right: {
    right: "0",
  },
  header: {
    maxWidth: "100%",
    gap: tokens.spacingHorizontalS,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: "0 5px",
  },
  headerCloseButton: {
    marginRight: tokens.spacingVerticalXXL,
  },
  content: {
    flex: `1 1 0%`,
    alignSelf: "stretch",
    position: "relative",

    overflow: "auto",
  },
  toggleButton: {
    zIndex: 99,
    position: "absolute",
    top: "62px",
    left: "0px",
    transition: "left 0.3s ease",
    borderLeft: "0",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  toggleButtonOpen: {
    left: "300px",
  },
  searchBox: {
    flexGrow: 1,
  },
});

const Panel = (props) => {
  const { open, children, side, togglePanel, title, showToggle } = props;
  const [istransitioning, setIstransitioning] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Hooks
  const styles = useStyles();
  const searchBoxRef = useRef();

  useEffect(() => {
    console.log("se", isSearchActive);
    console.log("searchBoxRef", searchBoxRef);
    console.log("searchBoxRef.current", searchBoxRef.current);
    if (isSearchActive && searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchActive, searchBoxRef]);

  const handleTogglePanel = () => {
    setIstransitioning(true);
    togglePanel();
    setTimeout(() => {
      setIstransitioning(false);
    }, 300);
  };

  const handleSearchButton = () => {
    setIsSearchActive(true);
  };

  return (
    <>
      {showToggle && (
        <Button
          className={mergeClasses(
            styles.toggleButton,
            open && styles.toggleButtonOpen
          )}
          onClick={handleTogglePanel}
          icon={open ? <CollapseIcon /> : <ExpandIcon />}
        />
      )}
      <div
        className={mergeClasses(
          styles.panelContainer,
          open && styles.panelOpen,
          side === PANEL_SIDES.LEFT ? styles.left : styles.right
        )}
      >
        <div className={styles.header}>
          {isSearchActive && (
            <SearchBox
              handleSearchChange={() => console.log("search for")}
              placeholder="Search"
              ariaLabel="global-search-box"
              debounceMilliseconds={150}
              className={styles.searchBox}
              toggleFocus={(focus) => setIsSearchActive(focus)}
              searchBoxRef={searchBoxRef}
            />
          )}
          {!istransitioning && !isSearchActive && (
            <>
              <Subtitle1>{title}</Subtitle1>
              <div>
                <Button
                  icon={<SearchIcon />}
                  appearance="subtle"
                  size={"small"}
                  style={{ marginRight: "2px" }}
                  onClick={handleSearchButton}
                />
                <Button
                  icon={<TableAddRegular />}
                  appearance="primary"
                  size={"small"}
                >
                  New Table
                </Button>
              </div>
            </>
          )}
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default Panel;
