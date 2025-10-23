import { type ReactElement, type ReactNode } from "react";

export interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({
  children,
}: Readonly<RootLayoutProps>): ReactElement {
  return <>{children}</>;
}
