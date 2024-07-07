import React, { useState } from "react";
import { makeStyles, Image, mergeClasses } from "@fluentui/react-components";

const useStyles = makeStyles({
  image16: {
    width: "16px",
    height: "16px",
  },
  image20: {
    width: "20px",
    height: "20px",
  },
  image24: {
    width: "24px",
    height: "24px",
  },
  image32: {
    width: "32px",
    height: "32px",
  },
  image40: {
    width: "40px",
    height: "40px",
  },
  image48: {
    width: "48px",
    height: "48px",
  },
  image64: {
    width: "64px",
    height: "64px",
  },
  default: {
    width: "auto",
    height: "auto",
  },
});

function CustomIcon(props) {
  const { size, src, onHoverSrc, alt, fit, overrideStyle } = props;
  const [over, setOver] = useState(false);
  const styles = useStyles();

  if (!src) return;

  if (!alt) {
    console.warn("Image missing alt-text");
  }

  let imageClassName;
  switch (size) {
    case "16":
      imageClassName = styles.image16;
      break;
    case "20":
      imageClassName = styles.image20;
      break;
    case "24":
      imageClassName = styles.image24;
      break;
    case "32":
      imageClassName = styles.image32;
      break;
    case "40":
      imageClassName = styles.image40;
      break;
    case "48":
      imageClassName = styles.image48;
      break;
    case "64":
      imageClassName = styles.image64;
      break;
    default:
      imageClassName = styles.default;
      break;
  }

  const containerStyle = overrideStyle
    ? mergeClasses(imageClassName, overrideStyle)
    : imageClassName;

  const imageSource = onHoverSrc && over ? onHoverSrc : src;

  return (
    <div
      className={containerStyle}
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
    >
      <Image alt={alt} src={imageSource} fit={fit ?? "contain"} />
    </div>
  );
}

export default CustomIcon;
