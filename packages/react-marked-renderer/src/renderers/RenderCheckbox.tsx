import { type ReactElement, useId } from "react";

import { type RenderCheckboxProps } from "../types.js";

export function RenderCheckbox({
  id,
  checked,
}: Readonly<RenderCheckboxProps>): ReactElement {
  const genId = useId();
  return <input type="checkbox" id={id || genId} defaultChecked={checked} />;
}
