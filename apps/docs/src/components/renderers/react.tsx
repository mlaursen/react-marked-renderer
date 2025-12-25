import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardTitle } from "@react-md/core/card/CardTitle";
import {
  type OverridableMarkdownRenderers,
  RenderReactElement,
} from "react-marked-renderer";

export const REACT_RENDERERS = {
  react: function RenderReact(props) {
    const { tagName, tokens, children } = props;
    switch (tagName) {
      case "Box":
        return <Box>{children}</Box>;
      case "Card":
        return <Card>{children}</Card>;
      case "CardHeader":
        return <CardHeader>{children}</CardHeader>;
      case "CardTitle":
        return <CardTitle>{tokens[0].raw}</CardTitle>;
    }

    return <RenderReactElement {...props} />;
  },
} satisfies OverridableMarkdownRenderers;
