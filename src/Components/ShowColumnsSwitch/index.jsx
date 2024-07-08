import React, { useState } from "react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { useCanvasSettings } from "../../context/CanvasSettingsContext";

const useStyles = makeStyles({
  icon: { color: tokens.colorNeutralForegroundStaticInverted },
});

const ShowColumnsSwitch = () => {
  const { toggleShowColumns } = useCanvasSettings();

  const [isChecked, setIsChecked] = useState(true);

  const styles = useStyles();

  const handleSwitchToggle = (ev) => {
    toggleShowColumns();
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Switch
        checked={isChecked}
        label={"Show Column"}
        inlineLabel
        onChange={handleSwitchToggle}
      />
    </div>
  );
};

export default ShowColumnsSwitch;
