import React, { useState } from "react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherMoonFilled } from "@fluentui/react-icons";
import { useTheme } from "../../context/ThemeContext";

const useStyles = makeStyles({
  icon: { color: tokens.colorNeutralForegroundStaticInverted },
});

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

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
            <WeatherMoonRegular className={styles.icon} />
          )
        }
        inlineLabel
        onChange={handleSwitchToggle}
      />
    </div>
  );
};

export default ThemeSwitch;
