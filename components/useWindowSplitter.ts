import React, { HTMLAttributes, useEffect, useState } from "react";

interface CSSProperties extends React.CSSProperties {
  "--split"?: string;
}

type WindowSplitterProps = Required<
  Pick<
    HTMLAttributes<HTMLElement>,
    | "aria-valuenow"
    | "aria-valuemin"
    | "aria-valuemax"
    | "style"
    | "tabIndex"
    | "onKeyDown"
    | "onMouseDown"
  >
>;

interface WindowSplitterHookReturnValue {
  gridStyle: CSSProperties | undefined;
  splitterProps: WindowSplitterProps;
}

export function useWindowSplitter(): WindowSplitterHookReturnValue {
  const [percentage, setPercentage] = useState(50);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const html = document.querySelector("html");
    if (!dragging || !html) {
      return;
    }

    const updatePosition = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      const position = (event.pageX / window.innerWidth) * 100;
      const percentage = Math.max(20, Math.min(80, position));

      setPercentage(percentage);
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
  }, [dragging]);

  const gridStyle: CSSProperties = {
    "--split": `${percentage}%`,
  };

  return {
    gridStyle,
    splitterProps: {
      "aria-valuenow": percentage,
      "aria-valuemin": 20,
      "aria-valuemax": 80,
      style: gridStyle,
      tabIndex: 0,
      onKeyDown(event) {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            setPercentage((prev) => Math.max(20, prev - 1));
            break;
          case "ArrowRight":
            event.preventDefault();
            setPercentage((prev) => Math.min(80, prev + 1));
            break;
          case "End":
            event.preventDefault();
            setPercentage(80);
            break;
          case "Home":
            event.preventDefault();
            setPercentage(20);
            break;
        }
      },
      onMouseDown(event) {
        if (
          event.button === 0 &&
          !event.altKey &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey
        ) {
          setDragging(true);
        }
      },
    },
  };
}
