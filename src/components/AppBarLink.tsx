import React, { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";
import {
  buttonThemeClassNames,
  Tooltip,
  useActionClassName,
  useTooltip,
} from "react-md";

interface AppBarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  id: string;
  first?: boolean;
  last?: boolean;
  tooltip: ReactNode;
}

export function AppBarLink({
  id,
  first,
  last,
  children,
  target,
  tooltip: label,
  ...props
}: AppBarLinkProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
  });
  return (
    <>
      <a
        {...props}
        {...elementProps}
        target={target}
        rel={target === "_blank" ? "noreferrer" : props.rel}
        className={useActionClassName({
          first,
          last,
          inheritColor: true,
          className: buttonThemeClassNames({
            theme: "clear",
            buttonType: "icon",
          }),
        })}
      >
        {children}
      </a>
      <Tooltip {...tooltipProps}>{label}</Tooltip>
    </>
  );
}
