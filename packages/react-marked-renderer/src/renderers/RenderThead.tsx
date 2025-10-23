import { type ReactElement } from "react";

import { type RenderTableSectionProps } from "../types.js";

export function RenderThead({
  children,
}: Readonly<RenderTableSectionProps>): ReactElement {
  return <thead>{children}</thead>;
}
