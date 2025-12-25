"use client";

import {
  TooltippedButton,
  type TooltippedButtonProps,
} from "@react-md/core/button/TooltippedButton";
import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { type ReactElement, useState } from "react";

import styles from "./CopyToClipboard.module.scss";

export interface CopyToClipboardProps extends TooltippedButtonProps {
  copyText: string;
}

export function CopyToClipboard(props: CopyToClipboardProps): ReactElement {
  const {
    "aria-label": ariaLabel = "Copy",
    iconSize = "small",
    buttonType = "icon",
    children = <MaterialSymbol name="content_copy" />,
    tooltip = "Copy to clipboard",
    tooltipOptions,
    copyText,
    ...remaining
  } = props;
  const [toastManager] = useState(() => new ToastManager());

  return (
    <ToastManagerProvider manager={toastManager}>
      <TooltippedButton
        {...remaining}
        aria-label={ariaLabel}
        iconSize={iconSize}
        buttonType={buttonType}
        tooltip={tooltip}
        tooltipOptions={{
          hoverTimeout: 0,
          defaultPosition: "left",
          ...tooltipOptions,
        }}
        className={styles.container}
        onClick={async () => {
          if (copyText) {
            await navigator.clipboard.writeText(copyText);
            toastManager.addToast({ children: "Copied to clipboard!" });
            // onCopied(text);
          }
        }}
      >
        {children}
      </TooltippedButton>
      <Snackbar
        {...(copyText.includes("\n") && {
          position: "bottom-right",
          absolute: true,
          disablePortal: true,
        })}
        toastDefaults={{ closeButton: true }}
      />
    </ToastManagerProvider>
  );
}
