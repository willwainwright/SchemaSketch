import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  icon: { color: tokens.colorNeutralForegroundStaticInverted },
});

const TableList = () => {
  const styles = useStyles();

  return (
    <div className={styles.themeSwitcher}>
      This will be where the table list is
    </div>
  );
};

export default TableList;
