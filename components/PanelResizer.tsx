/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ReactElement, useEffect, useState } from "react";

import styles from "./PanelResizer.module.scss";
import {
  MAX_SPLIT_PERCENTAGE,
  MIN_SPLIT_PERCENTAGE,
  usePlayground,
} from "./usePlayground";

export function PanelResizer(): ReactElement {
  const {
    splitPercentage,
    setSplitPercentage,
    minSplitPercentage,
    maxSplitPercentage,
    incrementSplitPercentage,
    decrementSplitPercentage,
  } = usePlayground();
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (!dragging) {
      return;
    }

    const updatePosition = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      setSplitPercentage((event.pageX / window.innerWidth) * 100);
    };

    const stopDragging = (event: MouseEvent): void => {
      updatePosition(event);
      setDragging(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [dragging, setSplitPercentage]);
  return (
    <div
      id="panel-resizer"
      aria-label="Resize Preview Panel"
      aria-controls="preview-panel"
      aria-valuemin={MIN_SPLIT_PERCENTAGE}
      aria-valuemax={MAX_SPLIT_PERCENTAGE}
      aria-valuenow={splitPercentage}
      tabIndex={0}
      role="separator"
      className={styles.separator}
      onKeyDown={(event) => {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            decrementSplitPercentage();
            break;
          case "ArrowRight":
            event.preventDefault();
            incrementSplitPercentage();
            break;
          case "Home":
            event.preventDefault();
            minSplitPercentage();
            break;
          case "End":
            event.preventDefault();
            maxSplitPercentage();
            break;
        }
      }}
      onMouseDown={(event) => {
        if (
          event.button === 0 &&
          !event.altKey &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey
        ) {
          setDragging(true);
        }
      }}
    />
  );
}
