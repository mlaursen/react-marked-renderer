import { type ReactElement } from "react";

import { type RenderTableSectionProps } from "../types.js";

export function RenderTableSection({
  header,
  children,
}: Readonly<RenderTableSectionProps>): ReactElement {
  const Component = header ? "thead" : "tbody";
  return <Component>{children}</Component>;
}
