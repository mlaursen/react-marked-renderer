import { type RenderGenericProps } from "../types.js";

const warnedOnce: Record<string, boolean> = {};

/**
 * This component _should_ only be run when using a custom marked extension
 * that generates an unknown type type. It will log a warning in dev/test
 * and always return `null`.
 *
 * If you see this warning, a `generic` renderer should be set.
 */
export function RenderGeneric({ type }: Readonly<RenderGenericProps>): null {
  if (process.env["NODE_ENV"] !== "production" && !warnedOnce[type]) {
    warnedOnce[type] = true;
    // eslint-disable-next-line no-console
    console.warn(`${type} does not have a known renderer and will be ignored.`);
  }

  return null;
}
