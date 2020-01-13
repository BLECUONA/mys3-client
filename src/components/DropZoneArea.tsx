import React, { useState } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Button, Tooltip } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Data } from './EnhancedTable';

interface Props {
    ButtonTextHover: string;
    addFile: (newRows: Data[]) => void;
}

const DropZoneArea: React.FC<Props> = (props) => {

    const [open, setOpen] = useState<boolean>(false);

    // useEffect(() => {
    //     console.log("FILES IN STATE: ")
    //     console.log(files)
    // })

    const _handleOpen = () => {
        setOpen(true);
    };

    const _handleClose = () => {
        setOpen(false);
    };

    // TODO
    const _handleSave = (files: File[]) => {
        const filesToAdd: Data[] = [];
        files.forEach(element => {
            console.log('###');
            console.log(element);
            filesToAdd.push({name: element.name, type: 'file', size: element.size});
        });
        console.log('****');
        console.log(filesToAdd);
        props.addFile(filesToAdd);
        // props.addFile();
        _handleClose();
    };

    return (
        // {props.ButtonLabel}
        <>
            <Tooltip title={props.ButtonTextHover}>
                <Button onClick={_handleOpen}>
                    <NoteAddIcon />
                </Button>
            </Tooltip>
            <DropzoneDialog
                open={open}
                onSave={_handleSave}
                onClose={_handleClose}
            />
        </>
    );
};

export default DropZoneArea;
