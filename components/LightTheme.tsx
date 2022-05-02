import { useEffect } from "react";

import styles from "./LightTheme.module.scss";

export default function LightTheme(): null {
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
