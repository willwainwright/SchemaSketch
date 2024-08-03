import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  AddFilled,
  ArrowDownloadFilled,
  OpenFilled,
  QuestionCircleFilled,
  QuestionCircleRegular,
  SettingsFilled,
  SettingsRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import React from "react";

import AppIcon from "../AppIcon";
import ThemeSwitch from "../ThemeSwitch";

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
  menuButtons: { color: tokens.colorNeutralForegroundOnBrand },
});

const TopBar = React.memo(() => {
  // Hooks
  const styles = useStyles();

  const SettingsIcon = bundleIcon(SettingsFilled, SettingsRegular);
  const HelpIcon = bundleIcon(QuestionCircleFilled, QuestionCircleRegular);
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
        <Button
          icon={<HelpIcon />}
          appearance="subtle"
          className={styles.menuButtons}
        />
        <ThemeSwitch />
        <Button
          icon={<SettingsIcon />}
          appearance="subtle"
          className={styles.menuButtons}
        />
      </div>
    </div>
  );
});

export default TopBar;
