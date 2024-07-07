import React from "react";
import {
  makeStyles,
  Button,
  tokens,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import {
  AddFilled,
  OpenFilled,
  ArrowDownloadFilled,
} from "@fluentui/react-icons";

import LogoIcon from "../../assets/images/icons/hexagon.svg";
import CustomIcon from "../CustomIcon";
import ThemeSwitch from "../ThemeSwitch";
import AppIcon from "../AppIcon";
import { KeyIcon } from "../KeyIcon/KeyIcon";

const useStyles = makeStyles({
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    height: "40px",
    backgroundColor: tokens.colorBrandBackground,
  },
  menuGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const TopBar = React.memo(() => {
  // Hooks
  const styles = useStyles();

  return (
    <div className={styles.topBar}>
      <div className={styles.menuGroup}>
        <AppIcon />
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button>Home</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem icon={<AddFilled />}>New Schema</MenuItem>
              <MenuItem icon={<OpenFilled />}>Load Schema</MenuItem>
              <MenuItem icon={<ArrowDownloadFilled />}>Export Schema</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <div className={styles.menuGroup}>
        <ThemeSwitch />
      </div>
    </div>
  );
});

export default TopBar;
