import {
  bundleIcon,
  PanelLeftExpandFilled,
  PanelLeftExpandRegular,
  PanelRightExpandFilled,
  PanelRightExpandRegular,
} from "@fluentui/react-icons";

export const ExpandIcon = () => {
  const Icon = bundleIcon(PanelLeftExpandFilled, PanelLeftExpandRegular);
  return <Icon />;
};

export const CollapseIcon = () => {
  const Icon = bundleIcon(PanelRightExpandFilled, PanelRightExpandRegular);
  return <Icon />;
};
