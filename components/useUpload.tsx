import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  FileUploadHookReturnValue,
  GetFileParser,
  getSplitFileUploads,
  useFileUpload,
} from "react-md";
import { ErrorModal } from "./ErrorModal";
import { usePlayground } from "./usePlayground";

type UploadContext = Pick<
  FileUploadHookReturnValue,
  "onDrop" | "onChange" | "accept"
>;

const noop = (): void => {
  // do nothing
};

const context = createContext<UploadContext>({
  onDrop: noop,
  onChange: noop,
  accept: "",
});
context.displayName = "Upload";
const { Provider } = context;

export function useUpload(): Readonly<UploadContext> {
  return useContext(context);
}

const getFileParser: GetFileParser = () => "readAsText";
const extensions = [
  "md",
  "txt",
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "yml",
  "yaml",
  "html",
] as const;

export function UploadProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { setMarkdown } = usePlayground();
  const { onDrop, stats, reset, errors, clearErrors, accept, onChange } =
    useFileUpload({
      maxFiles: 1,
      getFileParser,
      extensions,
    });
  const { complete } = getSplitFileUploads(stats);
  const [current] = complete;
  const type = current?.file.type?.replace(/^.*\//, "");
  const fileContents = current?.result;
  useEffect(() => {
    if (typeof fileContents !== "string") {
      return;
    }

    let contents = fileContents;
    if (type !== "markdown" && type) {
      contents = `\`\`\`${type}
${fileContents}\`\`\`
`;
    }

    setMarkdown(contents);
    reset();
  }, [fileContents, reset, setMarkdown, type]);

  return (
    <Provider
      value={useMemo(
        () => ({
          onDrop,
          accept,
          onChange,
        }),
        [accept, onChange, onDrop]
      )}
    >
      <ErrorModal errors={errors} clearErrors={clearErrors} />
      {children}
    </Provider>
  );
}
