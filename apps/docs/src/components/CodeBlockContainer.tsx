import { cssUtils } from "@react-md/core/cssUtils";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";

import styles from "./CodeBlockContainer.module.scss";

export interface CodeBlockContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  html: string;
  fixedChildren?: ReactNode;
  scrollContainerProps?: HTMLAttributes<HTMLDivElement>;
  preContainerProps?: HTMLAttributes<HTMLDivElement>;
}

export function CodeBlockContainer({
  html,
  className,
  fixedChildren,
  preContainerProps,
  scrollContainerProps,
  ...props
}: Readonly<CodeBlockContainerProps>): ReactElement {
  return (
    <div
      {...props}
      className={cnb(
        styles.container,
        cssUtils({
          textColor: "text-primary",
          surfaceColor: "dark",
        }),
        className
      )}
    >
      <div
        {...scrollContainerProps}
        className={cnb(styles.scrollContainer, scrollContainerProps?.className)}
      >
        <div
          {...preContainerProps}
          className={cnb(styles.preContainer, preContainerProps?.className)}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
      {fixedChildren}
    </div>
  );
}
