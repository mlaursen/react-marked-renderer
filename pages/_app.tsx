import "./app.scss";
import "./solarized-dark.css";
import React, { ReactElement } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  ConfigurableIcons,
  Configuration,
  ErrorOutlineSVGIcon,
  FileDownloadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
} from "react-md";

const icons: ConfigurableIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  download: <FileDownloadSVGIcon />,
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
