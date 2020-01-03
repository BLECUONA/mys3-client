import React, { useState, useEffect } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { file } from '@babel/types';
import { Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

interface Props {
    ButtonTextHover: string;
}

const DropZoneArea: React.FC<Props> = (props) => {

    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState<boolean>(false);

    // useEffect(() => {
    //     console.log("FILES IN STATE: ")
    //     console.log(files)
    // })

    const _handleOpen = () => {
        setOpen(true);
    }

    const _handleClose = () => {
        setOpen(false);
    }

    const _handleSave = (files: any) => {
        setFiles(files)
        _handleClose();
    }

    return (
        // {props.ButtonLabel}
        <>
            <Tooltip title={props.ButtonTextHover}>
                <Button onClick={_handleOpen}>
                    <AddIcon />
                </Button>
            </Tooltip>
            <DropzoneDialog
                open={open}
                onSave={_handleSave}
                onClose={_handleClose}
            />
        </>
    );
}

export default DropZoneArea;
