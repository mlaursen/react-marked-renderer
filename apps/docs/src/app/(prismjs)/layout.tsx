"use client";

import "prism-themes/themes/prism-solarized-dark-atom.css";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-git";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import { type ReactElement, type ReactNode } from "react";

Prism.manual = true;

export interface PrismJsLayoutProps {
  children: ReactNode;
}

export default function PrismJsLayout({
  children,
}: Readonly<PrismJsLayoutProps>): ReactElement {
  return <>{children}</>;
}
