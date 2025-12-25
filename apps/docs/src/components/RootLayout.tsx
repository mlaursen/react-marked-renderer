import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
import { Main } from "@react-md/core/layout/Main";
import { SkipToMainContent } from "@react-md/core/link/SkipToMainContent";
import Link from "next/link";
import { type ReactElement, type ReactNode } from "react";

import { Configuration } from "./Configuration";
import { GithubLink } from "./GithubLink";
import { TabsAppBar } from "./TabsAppBar";

export interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({
  children,
}: Readonly<RootLayoutProps>): ReactElement {
  return (
    <>
      <LayoutAppBar theme="surface" height="auto" stacked>
        <AppBar theme="clear">
          <SkipToMainContent />
          <MaterialSymbol name="markdown" />
          <AppBarTitle>react-marked-renderer</AppBarTitle>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/playground">Playground</Link>
          </nav>
          <GithubLink />
          <Configuration />
        </AppBar>
        <TabsAppBar />
      </LayoutAppBar>
      <Main appBarOffset>{children}</Main>
    </>
  );
}
