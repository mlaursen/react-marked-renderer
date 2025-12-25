import { Box } from "@react-md/core/box/Box";
import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { segmentedButton } from "@react-md/core/segmented-button/segmentedButtonStyles";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement, type ReactNode } from "react";

import { RENDERERS, type Renderer } from "./RendererProvider";

const RENDERERS_ICONS = {
  default: <MaterialSymbol name="code_off" />,
  prismjs: <MaterialSymbol name="deployed_code" />,
  highlightjs: <MaterialSymbol name="code_blocks" />,
} satisfies Record<Renderer, ReactNode>;

export function ConfigureRenderer(): ReactElement {
  const pathname = usePathname();

  return (
    <>
      <Box stacked fullWidth disablePadding align="stretch">
        <Typography margin="none">Renderers</Typography>
        <SegmentedButtonContainer>
          {RENDERERS.map((renderer) => {
            let href = "/playground";
            if (renderer !== "default") {
              href = `${href}/${renderer}`;
            }
            return (
              <Link
                key={renderer}
                href={href}
                className={segmentedButton({
                  selected: href === pathname,
                  className: typography({
                    type: null,
                    textTransform: "capitalize",
                    textDecoration: "none",
                  }),
                })}
              >
                {RENDERERS_ICONS[renderer]}
                {renderer}
              </Link>
            );
          })}
        </SegmentedButtonContainer>
      </Box>
    </>
  );
}
