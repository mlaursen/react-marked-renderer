import React, { FC } from "react";

export interface MarkdownProps {
  children: string;
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
  return <>{children}</>;
};

export default Markdown;
