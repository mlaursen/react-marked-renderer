import { RootHtml } from "@react-md/core/RootHtml";
// import "./vim-solarized-dark.scss";
import "highlight.js/styles/base16/solarized-dark.css";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
// import "prism-themes/themes/prism-material-dark.css";
import { type ReactElement, type ReactNode } from "react";

import { RootLayout } from "@/components/RootLayout";
import { RootProviders } from "@/components/RootProviders";

import "./layout.scss";
import "./symbols.scss";

export const metadata: Metadata = {
  title: "react-md - Next.js Example",
};

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--roboto",
});

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <RootHtml className={roboto.variable}>
      <RootProviders>
        <RootLayout>{children}</RootLayout>
      </RootProviders>
    </RootHtml>
  );
}
