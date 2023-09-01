import * as A from './styles';
// import { useState } from 'react'

interface AreaProps {
    children: React.ReactNode
}

export const Area: React.FC<AreaProps> = ({ children }) => {

    return (
        <A.AreaStyled>

            {children}
        </A.AreaStyled>
    )
}