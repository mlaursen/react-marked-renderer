import Prism from "prismjs";
import { type ReactElement } from "react";
import type { RenderCodeProps } from "react-marked-renderer";

const warnedOnce = new Set<string>();

export function RenderPrismJs({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): ReactElement {
  let prismLanguage = Prism.languages[lang];
  const language = prismLanguage ? lang : "markup";
  if (!prismLanguage) {
    prismLanguage = Prism.languages["markup"];

    if (!prismLanguage) {
      throw new Error("Unable to find a prismjs grammar");
    }

    if (process.env["NODE_ENV"] !== "production" && !warnedOnce.has(lang)) {
      warnedOnce.add(lang);
      // eslint-disable-next-line no-console
      console.warn(
        `"${lang}" has not been loaded in prismjs and instead using the fallback language "markup".

Prism has the following languages available:
${Object.keys(Prism.languages)
  .filter((name) => name !== "insertBefore" && name !== "extend")
  .map((name) => `- ${name}`)
  .join("\n")}
`
      );
    }
  }

  return (
    <pre className={`language-${language}`}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(text, prismLanguage, language),
        }}
      />
    </pre>
  );
}
