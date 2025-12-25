import type { ReactElement } from "react";
import { TabsManager } from "react-md";

import { FileDropzone } from "./FileDropzone";
import { Header } from "./Header";
import { PlaygroundView } from "./PlaygroundView";
import { PlaygroundProvider } from "./usePlayground";
import { UploadProvider } from "./useUpload";

const tabs = ["Editor", "Preview"] as const;

export default function Playground(): ReactElement {
  return (
    <PlaygroundProvider>
      <UploadProvider>
        <TabsManager tabs={tabs} tabsId="editor-tabs">
          <Header />
          <FileDropzone />
          <PlaygroundView />
        </TabsManager>
      </UploadProvider>
    </PlaygroundProvider>
  );
}
