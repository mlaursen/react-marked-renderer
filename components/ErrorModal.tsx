import { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FileValidationError,
} from "react-md";

import { ErrorRenderer } from "./ErrorRenderer";

export interface ErrorModalProps {
  errors: readonly FileValidationError<never>[];
  clearErrors(): void;
}

export function ErrorModal({
  errors,
  clearErrors,
}: ErrorModalProps): ReactElement {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(errors.length > 0);
  }, [errors]);

  const onRequestClose = (): void => {
    setVisible(false);
  };

  return (
    <Dialog
      id="error-modal"
      aria-labelledby="error-modal-title"
      modal
      onRequestClose={onRequestClose}
      visible={visible}
      onExited={clearErrors}
    >
      <DialogHeader>
        <DialogTitle id="error-modal-title">File Upload Errors</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {errors.map((error) => (
          <ErrorRenderer key={error.key} error={error} />
        ))}
      </DialogContent>
      <DialogFooter>
        <Button onClick={onRequestClose}>Okay</Button>
      </DialogFooter>
    </Dialog>
  );
}
