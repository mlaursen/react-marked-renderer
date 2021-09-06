import type { ReactElement } from "react";
import { TabsManager } from "react-md";

import { FileDropzone } from "./FileDropzone";
import { Header } from "./Header";
import { PlaygroundView } from "./PlaygroundView";
import { PlaygroundProvider } from "./usePlayground";

const tabs = ["Editor", "Preview"];

export default function Playground(): ReactElement {
  return (
    <PlaygroundProvider>
      <TabsManager tabs={tabs} tabsId="editor-tabs">
        <Header />
        <FileDropzone />
        <PlaygroundView />
      </TabsManager>
    </PlaygroundProvider>
  );
}
