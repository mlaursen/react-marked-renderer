import "./app.scss";
import "./solarized-dark.css";
import type { ReactElement } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ConfiguredIcons } from "react-md";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  Configuration,
  ErrorOutlineSVGIcon,
  FileUploadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
} from "react-md";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
  error: <ErrorOutlineSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
  menu: <MenuSVGIcon />,
  notification: <NotificationsSVGIcon />,
  password: <RemoveRedEyeSVGIcon />,
  radio: <RadioButtonCheckedSVGIcon />,
  selected: <CheckSVGIcon />,
  sort: <ArrowUpwardSVGIcon />,
  upload: <FileUploadSVGIcon />,
};

const DESCRIPTION =
  "A playground for the react-marked-renderer React component markdown renderer package.";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Configuration icons={icons}>
      <Head>
        <title>React Marked Renderer - Playground</title>
        <meta name="description" content={DESCRIPTION} />
      </Head>
      <Component {...pageProps} />
    </Configuration>
  );
}
