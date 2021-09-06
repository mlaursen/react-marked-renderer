import type { ReactElement, ReactNode } from "react";
import {
  AppBarAction as RMDAppBarAction,
  AppBarActionProps as RMDAppBarActionProps,
  Tooltip,
  useTooltip,
} from "react-md";

interface AppBarActionProps extends RMDAppBarActionProps {
  id: string;
  tooltip: ReactNode;
}

export function AppBarAction({
  id,
  children,
  tooltip,
  onClick,
  ...props
}: AppBarActionProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({ baseId: id, onClick });
  return (
    <>
      <RMDAppBarAction {...props} {...elementProps}>
        {children}
      </RMDAppBarAction>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
