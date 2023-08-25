import React from 'react';

interface ButtonDefaultProps {
    title: string;
    actionConfirm: () => void;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ title, actionConfirm }) => {
    return (
        <React.Fragment>
            <button onClick={actionConfirm}>{title}</button>
        </React.Fragment>
    );
};

export default ButtonDefault;
