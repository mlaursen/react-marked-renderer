import { useEffect } from "react";

import styles from "./DarkTheme.module.scss";

export default function DarkTheme(): null {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) {
      return;
    }

    html.classList.add(styles.container);
    return () => {
      html.classList.remove(styles.container);
    };
  }, []);
  return null;
}
