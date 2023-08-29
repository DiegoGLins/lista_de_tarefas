import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, DialogActions, Button } from '@mui/material';
import styles from './DialogConfirm.module.css';
interface DialogConfirmProps {
    titleTask: string;
    descriptionTask: string;
    openDialog: boolean;
    actionCancel: () => void;
    actionConfirm: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ titleTask, descriptionTask, openDialog, actionCancel, actionConfirm }) => {
    return (
        <Dialog
            open={openDialog}
            onClose={actionCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className={styles.typingEffect}>
                {titleTask.split('').map((char, index) => (
                    <span key={index}>{char}</span>
                ))}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className={styles.modalMessage}>
                    <>
                        <Typography variant='h6'>{descriptionTask}</Typography>
                    </>
                </DialogContentText>
            </DialogContent>
            <DialogActions className={styles.modalButtons}>
                <Button onClick={actionCancel} className={styles.button}>Cancelar</Button> 
                <Button onClick={actionConfirm} autoFocus className={styles.button}>Confirmar</Button> 
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;