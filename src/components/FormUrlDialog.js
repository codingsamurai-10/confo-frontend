import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

export default function AlertDialog(props) {
  const [copy, setCopy] = React.useState("Copy");

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.formUrl}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip title={copy} placement="top">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(props.formUrl);
                setCopy("Copied!");
              }}
              onMouseLeave={() => setCopy("Copy to clipboard!")}
              color="primary"
            >
              Copy
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
}
