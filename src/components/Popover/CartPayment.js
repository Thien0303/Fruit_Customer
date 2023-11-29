import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Popup = ({ open, onClose, imageUrl, depositPrice  }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vui lòng quét mã thanh toán</DialogTitle>
      <DialogContent>
      <Typography variant="h5" color="green" sx={{marginBottom: "10px", fontWeight: "bold"}}>Số tiền cần thanh toán: {depositPrice * 1000} vnđ</Typography>
        <img
          src={imageUrl}
          alt="QR Code"
          style={{ width: "100%", height: "auto" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
