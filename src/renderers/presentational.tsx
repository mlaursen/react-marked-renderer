import type { marked } from "marked";
import type { ComponentType, ReactElement } from "react";

export type SpaceRendererProps = marked.Tokens.Space;

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

export type BrRendererProps = marked.Tokens.Br;

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

export type HrRendererProps = marked.Tokens.Hr;

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

/**
 * These types of renderers should never have `children` or are just whitespace.
 */
export interface PresentationRenderers {
  /** @see {@link BrRenderer} for default implementation */
  br: ComponentType<BrRendererProps>;
  /** @see {@link HrRenderer} for default implementation */
  hr: ComponentType<HrRendererProps>;
  /** @see {@link SpaceRenderer} for default implementation */
  space: ComponentType<SpaceRendererProps>;
}

export const PRESENTATIONAL_RENDERERS: PresentationRenderers = {
  br: BrRenderer,
  hr: HrRenderer,
  space: SpaceRenderer,
};
