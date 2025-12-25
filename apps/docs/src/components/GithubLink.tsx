"use client";

import { button } from "@react-md/core/button/styles";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import Link from "next/link";
import { type ReactElement } from "react";

import { GithubIcon } from "./GithubIcon";

export function GithubLink(): ReactElement {
  const { tooltipProps, elementProps } = useTooltip<HTMLAnchorElement>();
  return (
    <>
      <Link
        aria-label="Github"
        href="https://github.com/mlaursen/react-marked-renderer"
        className={button({ buttonType: "icon" })}
        {...elementProps}
      >
        <GithubIcon />
      </Link>
      <Tooltip {...tooltipProps}>Github</Tooltip>
    </>
  );
}
