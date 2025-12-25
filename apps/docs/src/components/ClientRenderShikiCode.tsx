import { Toast } from "@react-md/core/snackbar/Toast";
import { snackbar } from "@react-md/core/snackbar/snackbarStyles";
import "client-only";
import {
  type ReactElement,
  startTransition,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type RenderCodeProps } from "react-marked-renderer";
import { type HighlighterCore } from "shiki";

import { highlighterPromise } from "@/constants/shikiClientHighlighter";
import { SHIKI_CONFIG } from "@/constants/shikiConfig";

import { CodeBlockContainer } from "./CodeBlockContainer";
import { CopyToClipboard } from "./CopyToClipboard";

interface ParseOptions {
  text: string;
  lang: string;
  highlighter: HighlighterCore;
  fallbackHtml?: string;
}

interface ParseResult {
  html: string;
  error?: Error;
}

const parse = ({
  text,
  lang,
  highlighter,
  fallbackHtml = "",
}: ParseOptions): ParseResult => {
  try {
    return {
      html: highlighter.codeToHtml(text, {
        ...SHIKI_CONFIG,
        lang,
      }),
    };
  } catch (e) {
    return {
      html: fallbackHtml,
      error: e instanceof Error ? e : new Error("Unable to highlight code."),
    };
  }
};

export function ClientRenderShikiCode({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): ReactElement {
  const highlighter = use(highlighterPromise);

  // this fails the eslint rules because you cannot access ref during render,
  // but it seems better than the other options
  const lastRenderedHtml = useRef("");
  const { html, error } = parse({
    text,
    lang,
    highlighter,
    // eslint-disable-next-line react-hooks/refs
    fallbackHtml: lastRenderedHtml.current,
  });
  // eslint-disable-next-line react-hooks/refs
  lastRenderedHtml.current = html;

  // this fails the eslint rules because you should not call setState
  // synchronously in useEffect... I can get the rule to disappear by wrapping
  // the setState call in a startTransition, but that seems like the rule just
  // wasn't setup correctly to handle edge cases.
  //
  // const [{ html, error }, setState] = useState<ParseResult>(() =>
  //   parse({ text, lang, highlighter })
  // );
  // useEffect(() => {
  //   const { html, error } = parse({
  //     text,
  //     lang,
  //     highlighter,
  //     fallbackHtml: "",
  //   });
  //
  //   setState((prevState) => ({
  //     html: error ? prevState.html : html,
  //     error,
  //   }));
  // }, [highlighter, lang, text]);
  // const [html, setHtml] = useState(() => )

  // this is apparently fine even though a `useMemo` has a  side-effect which
  // seems like it should break the rules of hooks...
  //
  // const [fallbackHtml, setFallbackHtml] = useState("");
  // const { html, error } = useMemo(() => {
  //   const { html, error } = parse({
  //     text,
  //     lang,
  //     highlighter,
  //     fallbackHtml,
  //   });
  //
  //   if (html !== fallbackHtml) {
  //     startTransition(() => {
  //       setFallbackHtml(html);
  //     });
  //   }
  //
  //   return { html, error };
  // }, [fallbackHtml, highlighter, lang, text]);

  return (
    <CodeBlockContainer
      html={html}
      fixedChildren={
        <>
          <CopyToClipboard copyText={text} />
          <div
            aria-live="polite"
            className={snackbar({ position: "bottom-right", absolute: true })}
          >
            <Toast theme="error" visible={!!error} timeout={0} multiline>
              <p>{error?.message}.</p>
              <p>
                Rendering the previous highlighted code until this has been
                fixed.
              </p>
            </Toast>
          </div>
        </>
      }
    />
  );
}
