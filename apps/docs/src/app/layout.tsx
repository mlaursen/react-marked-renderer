import { RootHtml } from "@react-md/core/RootHtml";
import { cnb } from "cnbuilder";
import type { Metadata } from "next";
import { Roboto_Flex, Source_Code_Pro } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";

import { RootLayout } from "@/components/RootLayout";
import { RootProviders } from "@/components/RootProviders";
import { SYMBOL_NAMES } from "@/rmdConfig";

import "./layout.scss";

export const metadata: Metadata = {
  title: "react-marked-renderer - Render markdown with React components",
  description:
    "Render markdown using custom React components instead of plain HTML strings with marked.",
};

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--roboto",
});
const sourceCodePro = Source_Code_Pro({
  variable: "--source-code-pro",
  display: "swap",
});

const BASE_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
const FONT_URL = `${BASE_URL}&icon_names=${SYMBOL_NAMES.join(",")}&display=block`;

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <RootHtml
      className={cnb(roboto.variable, sourceCodePro.variable)}
      beforeBodyChildren={
        <head>
          <link rel="stylesheet" href={FONT_URL} />
        </head>
      }
    >
      <RootProviders>
        <RootLayout>{children}</RootLayout>
      </RootProviders>
    </RootHtml>
  );
}
