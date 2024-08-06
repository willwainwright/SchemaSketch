import {
  bundleIcon,
  PanelLeftExpandFilled,
  PanelLeftExpandRegular,
  PanelRightExpandFilled,
  PanelRightExpandRegular,
  SearchFilled,
  SearchRegular,
} from "@fluentui/react-icons";

export const ExpandIcon = () => {
  const Icon = bundleIcon(PanelLeftExpandFilled, PanelLeftExpandRegular);
  return <Icon />;
};

export const CollapseIcon = () => {
  const Icon = bundleIcon(PanelRightExpandFilled, PanelRightExpandRegular);
  return <Icon />;
};

export const SearchIcon = () => {
  const Icon = bundleIcon(SearchFilled, SearchRegular);
  return <Icon />;
};
