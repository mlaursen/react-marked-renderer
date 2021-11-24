import type { ReactElement } from "react";
import {
  AppBarAction,
  Button,
  CloseSVGIcon,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Link,
  Typography,
  TextContainer,
} from "react-md";

import { usePlayground } from "./usePlayground";

const GITHUB_URL = "https://github.com/mlaursen/react-marked-renderer";
const GITHUB_FILE_URL = `${GITHUB_URL}/blob/${
  process.env.NEXT_PUBLIC_COMMIT_SHA || "main"
}`;
const dialogId = "help-dialog";
const titleId = `${dialogId}-title`;
const closeId = `${dialogId}-x`;

interface ReferenceLink {
  name: string;
  href: string;
}

const links: readonly ReferenceLink[] = [
  {
    name: "API Documentation (typedoc)",
    href: "/tsdocs/index.html",
  },
  {
    name: "GitHub - react-marked-renderer",
    href: GITHUB_URL,
  },
  {
    name: "Custom Renderers Source Code",
    href: `${GITHUB_FILE_URL}/components/renderers.tsx`,
  },
  {
    name: "GitHub Markdown Cheatsheet",
    href: "https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf",
  },
];

export interface HelpDialogProps {
  visible: boolean;
  onRequestClose(): void;
}

export function HelpDialog({
  visible,
  onRequestClose,
}: HelpDialogProps): ReactElement {
  const { reset } = usePlayground();
  return (
    <Dialog
      id={dialogId}
      aria-labelledby={titleId}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <DialogHeader>
        <DialogTitle id={titleId}>Playground</DialogTitle>
        <AppBarAction id={closeId} onClick={onRequestClose} first last>
          <CloseSVGIcon />
        </AppBarAction>
      </DialogHeader>
      <TextContainer clone>
        <DialogContent>
          <Typography type="headline-6" margin="none">
            About
          </Typography>
          <Typography>
            This playground allows you to preview markdown with either the
            default renderer behavior or custom renderers using{" "}
            <Link href="https://react-md.dev">react-md</Link> for custom
            styling. Markdown can be manually typed into the editor or text
            files can be uploaded via drag-and drop.
          </Typography>
          <Typography>
            The website can be viewed in split-view mode (default) or in a
            tabbed view which can be useful if there isn&apos;t enough screen
            space. The split-view mode also allows for resizing the panes by
            grabbing the divider in the middle of the page.
          </Typography>
          <Typography type="headline-6" margin="top">
            Useful links:
          </Typography>
          <ul>
            {links.map(({ name, href }) => (
              <Typography key={href} component="li" type="subtitle-1">
                <Link href={href} target="_blank">
                  {name}
                </Link>
              </Typography>
            ))}
          </ul>
        </DialogContent>
      </TextContainer>
      <DialogFooter>
        <Button
          theme="warning"
          onClick={() => {
            reset();
            onRequestClose();
          }}
        >
          Reset Playground
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
