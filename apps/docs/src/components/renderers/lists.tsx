import { Checkbox } from "@react-md/core/form/Checkbox";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import { cnb } from "cnbuilder";
import { type OverridableMarkdownRenderers } from "react-marked-renderer";

import styles from "./lists.module.scss";

export const LIST_RENDERERS = {
  checkbox: function RenderCheckbox({ id, checked }) {
    return <Checkbox id={id} defaultChecked={checked} />;
  },

  list: function RenderList({ children, ordered, start }) {
    const Tag = ordered ? "ol" : "ul";
    return (
      <Tag start={start} className={typography({ type: "subtitle-1" })}>
        {children}
      </Tag>
    );
  },

  listitem: function RenderListItem({ task, loose, checked, children }) {
    if (task) {
      if (loose) {
        return (
          <li className={cnb(styles.task, styles.loose)}>
            <Checkbox aria-label="Task" defaultChecked={checked} />
            {children}
          </li>
        );
      }

      return (
        <li className={styles.task}>
          <Checkbox label={children} defaultChecked={checked} />
        </li>
      );
    }

    return <Typography as="li">{children}</Typography>;
  },

  // task: function RenderTask() {
  //
  // }
} satisfies OverridableMarkdownRenderers;
