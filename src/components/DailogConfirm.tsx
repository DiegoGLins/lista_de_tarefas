import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, DialogActions, Button } from '@mui/material';
import React from 'react';

interface DialogConfirmProps {
    titleTask: string;
    descriptionTask: string;
    openDialog: boolean;
    actionCancel: () => void;
    actionConfirm: () => void
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ titleTask, descriptionTask, openDialog, actionCancel, actionConfirm }) => {
    return (
        <Dialog
            open={openDialog}
            onClose={actionCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {titleTask}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <>
                        <Typography variant='h6'>{descriptionTask}</Typography>
                    </>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={actionCancel}>Cancelar</Button>
                <Button onClick={actionConfirm} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;