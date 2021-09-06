import { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

const PRISM_HTML = "window.Prism=window.Prism||{};window.Prism.manual=true";

const GA_CODE = process.env.NEXT_PUBLIC_GA_CODE;
const GA_HREF = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;
const GA_HTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');
`;

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: PRISM_HTML }} />
          {process.env.NODE_ENV === "production" && GA_CODE && (
            <>
              <script async src={GA_HREF} />
              <script dangerouslySetInnerHTML={{ __html: GA_HTML }} />
            </>
          )}
          <NextScript />
        </body>
      </Html>
    );
  }
}
