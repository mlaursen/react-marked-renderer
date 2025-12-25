import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { useStorage } from "@react-md/core/storage/useStorage";
import { type TabsImplementation, useTabs } from "@react-md/core/tabs/useTabs";
import { usePathname } from "next/navigation";
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
} from "react";

export const PLAYGROUND_VIEWS = ["editor", "preview"] as const;
export type PlaygroundView = (typeof PLAYGROUND_VIEWS)[number] | "resizable";

export interface PlaygroundViewContext
  extends Required<TabsImplementation<PlaygroundView>> {
  isTabsAvailable: boolean;
  isLayoutAvailable: boolean;
}

const context = createContext<PlaygroundViewContext | null>(null);
const { Provider } = context;

export function usePlaygroundView(): Readonly<PlaygroundViewContext> {
  const value = useContext(context);
  if (!value) {
    throw new Error("PlaygroundViewProvider must be initialized.");
  }

  return value;
}

export interface PlaygroundViewProviderProps {
  children: ReactNode;
}

export function PlaygroundViewProvider({
  children,
}: Readonly<PlaygroundViewProviderProps>): ReactElement {
  const pathname = usePathname();
  const { value: activeTab, setValue: setActiveTab } =
    useStorage<PlaygroundView>({
      key: "view",
      defaultValue: "resizable",
      serializer: (item) =>
        item === "editor" || item === "preview" || item === "resizable"
          ? item
          : "editor",
    });

  const { isPhone } = useAppSize();
  const value = useTabs({
    tabs: PLAYGROUND_VIEWS,
    activeTab: isPhone && activeTab === "resizable" ? "editor" : activeTab,
    setActiveTab,
  });

  const isPlayground =
    pathname === "/playground" ||
    pathname === "/playground/prismjs" ||
    pathname === "/playground/highlightjs";

  return (
    <Provider
      value={{
        ...value,
        activeTab,
        setActiveTab,
        isTabsAvailable: isPlayground && (isPhone || activeTab !== "resizable"),
        isLayoutAvailable: isPlayground && !isPhone,
      }}
    >
      {children}
    </Provider>
  );
}
