import React, { useState } from "react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherMoonFilled } from "@fluentui/react-icons";
import { useTheme } from "../../context/ThemeContext";

const useStyles = makeStyles({
  themeSwitcher: {
    position: "fixed",
    top: tokens.spacingVerticalL,
    right: tokens.spacingVerticalL,
    zIndex: 1000,
    background: tokens.colorBrandBackground2,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  const [isChecked, setIsChecked] = useState(false);

  const styles = useStyles();

  const handleSwitchToggle = () => {
    toggleTheme();
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Switch
        checked={isChecked}
        label={isChecked ? <WeatherMoonFilled /> : <WeatherMoonRegular />}
        inlineLabel
        onChange={handleSwitchToggle}
      />
    </div>
  );
};

export default ThemeSwitch;
