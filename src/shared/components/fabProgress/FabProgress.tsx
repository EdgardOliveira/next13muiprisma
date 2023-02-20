import { Box, CircularProgress, Fab, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

interface IFabProgress {
  isLoading: boolean;
  isSaving: boolean;
  onClick: () => void;
}

export default function FabProgress({
  isLoading,
  isSaving,
  onClick,
}: IFabProgress) {
  const buttonSx = {
    ...(isLoading && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Tooltip title="Salvar">
        <Fab
          aria-label="Salvar"
          color="primary"
          sx={buttonSx}
          onClick={onClick}
        >
          {isSaving ? <CheckIcon /> : <SaveIcon />}
        </Fab>
      </Tooltip>
      {isSaving && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
