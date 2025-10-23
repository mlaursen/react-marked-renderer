import { type ReactElement, type ReactNode } from "react";

import type { RenderTableProps } from "../types.js";

export function RenderTable({
  children,
}: Readonly<RenderTableProps>): ReactElement {
  return <table>{children}</table>;
}
