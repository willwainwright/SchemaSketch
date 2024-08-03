import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { WeatherMoonFilled, WeatherSunnyFilled } from "@fluentui/react-icons";
import React, { useState } from "react";
import { useCanvasSettings } from "../../context/CanvasSettingsContext";

const useStyles = makeStyles({
  icon: { color: tokens.colorNeutralForegroundStaticInverted },
});

const ThemeSwitch = () => {
  const { toggleTheme } = useCanvasSettings();

  const [isChecked, setIsChecked] = useState(false);

  const styles = useStyles();

  const handleSwitchToggle = (ev) => {
    toggleTheme();
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Switch
        checked={isChecked}
        label={
          isChecked ? (
            <WeatherMoonFilled className={styles.icon} />
          ) : (
            <WeatherSunnyFilled className={styles.icon} />
          )
        }
        inlineLabel
        onChange={handleSwitchToggle}
      />
    </div>
  );
};

export default ThemeSwitch;
