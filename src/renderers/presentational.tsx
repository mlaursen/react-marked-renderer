import type { ReactElement } from "react";

/**
 * The default implementation for rendering the {@link Tokens.Hr} by rendering:
 *
 * ```tsx
 * <hr />
 * ```
 */
export function HrRenderer(): ReactElement {
  return <hr />;
}

/**
 * The default implementation for rendering the {@link Tokens.Space} by
 * rendering:
 *
 * ```tsx
 * <> </>
 * ```
 */
export function SpaceRenderer(): ReactElement {
  return <> </>;
}

/**
 * The default implementation for rendering the {@link Tokens.Br} by rendering:
 *
 * ```tsx
 * <br />
 * ```
 */
export function BrRenderer(): ReactElement {
  return <br />;
}
