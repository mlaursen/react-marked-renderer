import "highlight.js/styles/base16/solarized-dark.css";
import { type ReactElement, type ReactNode } from "react";

export interface HighlightJsLayoutProps {
  children: ReactNode;
}

export default function HighlightJsLayout({
  children,
}: Readonly<HighlightJsLayoutProps>): ReactElement {
  return <>{children}</>;
}
