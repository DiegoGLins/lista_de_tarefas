import { Box } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50px',
    left: '50px',
    width: '80%',
};


interface AlertProps {
    children: React.ReactNode
}

export default function AlertStyled({ children }: AlertProps) {

    return (
        <Box sx={style}>
            {children}
        </Box>
    );
}