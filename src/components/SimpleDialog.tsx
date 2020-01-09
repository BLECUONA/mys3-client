import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    textTitle: string;
    textMessage: string;
    textOk?: string;
    textCancel?: string;
    actionOk?: () => void;
    actionCancel?: () => void;
    actionClose?: () => void;
}

const SimpleDialog: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleValid = () => {
        if (props.actionOk) props.actionOk();
        handleClose();
    };

    const handleCancel = () => {
        if (props.actionOk) props.actionOk();
        handleClose();
    };

    const handleClose = () => {
        if (props.actionClose) props.actionClose();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.textTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.textMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.textCancel &&
                    <Button onClick={handleCancel} color="primary">
                        {props.textCancel}
                    </Button>
                }
                {props.textOk &&
                    <Button onClick={handleValid} color="primary" autoFocus>
                        {props.textOk}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default SimpleDialog;