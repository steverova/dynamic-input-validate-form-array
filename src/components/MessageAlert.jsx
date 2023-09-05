/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function MessageAlert({ message, handleAlert, open, onClose }) {
  const handleAlertMessage = () => {
    handleAlert(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlertMessage(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
