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
  TopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    height: "40px",
    backgroundColor: tokens.colorBrandBackground,
  },
});

const TopBar = React.memo(() => {
  // Hooks
  const styles = useStyles();

  return (
    <div className={styles.TopBar}>
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

      <ThemeSwitch />
    </div>
  );
});

export default TopBar;
