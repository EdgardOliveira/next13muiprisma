import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IConfirmationDialog {
  title: string;
  message: string;
  isConfirmationDialogOpened: boolean;
  onCancelConfirmationDialog: () => void;
  onConfirmConfirmationDialog: () => void;
}

export default function ConfirmationDialog({
  onCancelConfirmationDialog,
  onConfirmConfirmationDialog,
  isConfirmationDialogOpened,
  title,
  message,
}: IConfirmationDialog) {
  const handleCancel = () => {
    onCancelConfirmationDialog();
  };

  const handleConfirm = () => {
    onConfirmConfirmationDialog();
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      open={isConfirmationDialogOpened}
    >
      <DialogTitle style={{ color: "green" }}>{title}</DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions disableSpacing={true}>
        <Button onClick={handleCancel} variant="outlined" color="success">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="outlined" color="success">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
