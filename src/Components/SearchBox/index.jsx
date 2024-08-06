import {
  Button,
  Input,
  makeStyles,
  mergeClasses,
} from "@fluentui/react-components";
import { DismissRegular, SearchRegular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";

const DismissButton = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<DismissRegular />}
      size="small"
    />
  );
};

const useStyles = makeStyles({
  searchBox: {
    width: "180px",
  },
  hidden: {
    visibility: "hidden",
    width: 0,
  },
});

export const SearchBox = (props) => {
  const {
    handleSearchChange,
    placeholder,
    ariaLabel,
    debounceMilliseconds,
    className,
    toggleFocus,
    searchBoxRef,
  } = props;

  const [value, setValue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);

  const styles = useStyles();

  // debounce the input
  useEffect(() => {
    if (!value) return;

    const timeoutId = setTimeout(() => {
      handleSearchChange(value);
    }, debounceMilliseconds ?? 0);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounceMilliseconds]);

  const handleOnChange = (_, data) => {
    if (data?.value) {
      setValue(data.value);
    } else {
      clearBox();
    }
  };

  const clearBox = () => {
    setValue("");
    handleSearchChange("");
  };

  const handleFocusChange = (hasFocus) => {
    setHasFocus(hasFocus);
    toggleFocus?.(hasFocus);
  };

  return (
    <Input
      contentBefore={<SearchRegular className={hasFocus && styles.hidden} />}
      contentAfter={
        !!value && (
          <DismissButton aria-label="Dismiss search box" onClick={clearBox} />
        )
      }
      onChange={handleOnChange}
      placeholder={placeholder}
      aria-label={ariaLabel ?? "search box"}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
      className={mergeClasses(styles.searchBox, className)}
      value={value}
      ref={searchBoxRef}
    />
  );
};

export default SearchBox;
