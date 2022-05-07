import { ReactElement, useId } from "react";
import { FileInput, Tooltip, useActionClassName, useTooltip } from "react-md";
import { useUpload } from "./useUpload";

export function MarkdownFileUpload(): ReactElement {
  const { accept, onChange } = useUpload();
  const { elementProps, tooltipProps } = useTooltip({
    baseId: useId(),
  });
  const className = useActionClassName({ first: true });

  return (
    <>
      <span {...elementProps} className={className}>
        <FileInput
          id={useId()}
          accept={accept}
          onChange={onChange}
          theme="clear"
          themeType="flat"
        />
      </span>
      <Tooltip {...tooltipProps}>
        Replace the editor with an uploaded file&apos;s contents. Try uploading
        a README.md file!
      </Tooltip>
    </>
  );
}
