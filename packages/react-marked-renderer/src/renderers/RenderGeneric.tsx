import { type RenderGenericProps } from "../types.js";

const warnedOnce: Record<string, boolean> = {};

export function RenderGeneric({ type }: Readonly<RenderGenericProps>): null {
  if (process.env["NODE_ENV"] !== "production" && !warnedOnce[type]) {
    warnedOnce[type] = true;
    // eslint-disable-next-line no-console
    console.warn(`${type} does not have a known renderer and will be ignored.`);
  }

  return null;
}
