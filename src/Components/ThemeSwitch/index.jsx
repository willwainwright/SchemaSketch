import React, { useState } from "react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherMoonFilled } from "@fluentui/react-icons";

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

const ThemeSwitch = (props) => {
  const { setTheme } = props;

  const [isChecked, setIsChecked] = useState(false);

  const styles = useStyles();

  const toggleTheme = (ev) => {
    const theme = ev.currentTarget.checked ? webDarkTheme : webLightTheme;
    setTheme(theme);
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Switch
        checked={isChecked}
        label={isChecked ? <WeatherMoonFilled /> : <WeatherMoonRegular />}
        inlineLabel
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeSwitch;
