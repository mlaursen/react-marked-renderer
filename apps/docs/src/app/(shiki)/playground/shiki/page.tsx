"use client";

import {
  type ReactElement,
  Suspense,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { Markdown, type RenderCodeProps } from "react-marked-renderer";
import { codeToHtml } from "shiki";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

import { CUSTOM_RENDERERS } from "@/app/renderers";
import { useMarkdown } from "@/components/Playground/MarkdownProvider";

const _highlighter = createHighlighterCore({
  engine: createOnigurumaEngine(() => import("shiki/wasm")),
  langs: [
    import("@shikijs/langs/javascript"),
    import("@shikijs/langs/typescript"),
    import("@shikijs/langs/tsx"),
    import("@shikijs/langs/sh"),
    import("@shikijs/langs/json"),
  ],
  themes: [
    import("@shikijs/themes/solarized-light"),
    import("@shikijs/themes/solarized-dark"),
  ],
});

function RenderShikiCode({
  text,
  lang = "",
}: Readonly<RenderCodeProps>): ReactElement {
  const highlighter = use(_highlighter);
  const html = highlighter.codeToHtml(text, {
    lang,
    themes: {
      dark: "solarized-dark",
      light: "solarized-light",
    },
    defaultColor: "light",
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

export default function ShikiPage(): ReactElement {
  const { markdown } = useMarkdown();
  // const fallbackCount = useRef(0);
  // console.log("fallbackCount.current:", fallbackCount.current);

  return (
    <Markdown
      markdown={markdown}
      renderers={{
        ...CUSTOM_RENDERERS,
        code: function RenderCode({ text, lang = "" }) {
          const [html, setHtml] = useState("");
          useEffect(() => {
            let cancelled = false;
            async function update(): Promise<void> {
              const html = await codeToHtml(text, {
                lang,
                themes: {
                  dark: "solarized-dark",
                  light: "github-light-default",
                },
                defaultColor: "light",
              });

              if (!cancelled) {
                setHtml(html);
              }
            }

            update();

            return () => {
              cancelled = true;
            };
          }, [lang, text]);

          if (html) {
            return <div dangerouslySetInnerHTML={{ __html: html }} />;
          }

          return (
            <pre>
              <code>{text}</code>
            </pre>
          );

          // return (
          //   <Suspense
          //     fallback={
          //       fallbackCount.current++ !== null && (
          //         <div>
          //           <pre>
          //             <code>{props.text}</code>
          //           </pre>
          //         </div>
          //       )
          //     }
          //   >
          //     <RenderShikiCode {...props} />
          //   </Suspense>
          // );
        },
      }}
    />
  );
}
