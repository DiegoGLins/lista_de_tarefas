import * as A from './styles';
// import { useState } from 'react'

interface AreaProps {
    children: React.ReactNode
}

export const Area: React.FC<AreaProps> = ({ children }) => {

    return (
        <A.AreaStyled>
            <div className='image'>
                <img src='./src/assets/Mario-gif.gif' alt='Mario' style={{ maxWidth: '50px' }}/>
            </div>
            {children}
        </A.AreaStyled>
    )
}