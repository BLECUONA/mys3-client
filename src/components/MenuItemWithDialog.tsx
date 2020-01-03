import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem } from '@material-ui/core';

interface Props {
    textButton: string;
    actionYes?: any;
    textTitle: string;
    textDialog: string;
    textYes: string;
    textNo: string
}

const MenuItemWithDialog: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = (cbYes: any) => {
        cbYes();
        handleClose();
    }

    return (
        <div>
            <MenuItem onClick={handleClickOpen}>
                {props.textButton}
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.textTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.textDialog}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        {props.textNo}
                    </Button>
                    <Button onClick={() => handleYes(props.actionYes)} color="secondary" autoFocus>
                        {props.textYes}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MenuItemWithDialog;