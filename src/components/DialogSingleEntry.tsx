import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { Button, Tooltip } from '@material-ui/core';

interface Props {
    ButtonTextHover: string;
    textTitle?: string;
    textMessage: string;
    textOk?: string;
    textCancel?: string;
    actionOk?: (res: string) => Promise<string | undefined>;
    actionCancel?: () => void;
    actionClose?: () => void;
}

const DialogSingleEntry: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [output, setOutput] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [isError, setIsError] = React.useState<boolean>(false);

    const handleValid = async () => {
        let errMsg: string | undefined = '';
        if (props.actionOk) {
            errMsg = await props.actionOk(output);
            if (errMsg !== undefined && errMsg?.length > 0) {
                setErrorMessage(errMsg);
                setIsError(true);
            } else handleClose();
        }
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleClose = () => {
        if (props.actionClose) props.actionClose();
        setOpen(false);
    };

    const _handleOpen = () => {
        setOpen(true);
    };

    const _handleOutputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutput(event.target.value);
    };

    return (
        <>
            <Tooltip title={props.ButtonTextHover}>
                <Button onClick={_handleOpen}>
                    <AddIcon />
                </Button>
            </Tooltip>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="entry"
                        label="Entry"
                        type="text"
                        fullWidth
                        onChange={_handleOutputChange}
                        error={isError}
                        helperText={errorMessage}
                    />
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
        </>
    );
};

export default DialogSingleEntry;