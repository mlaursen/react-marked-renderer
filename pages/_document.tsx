import { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

const PRISM_MANUAL_MODE =
  "window.Prism=window.Prism||{};window.Prism.manual=true";

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
          <script dangerouslySetInnerHTML={{ __html: PRISM_MANUAL_MODE }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
