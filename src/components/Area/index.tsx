import * as A from './styles';
import { useState, KeyboardEvent } from 'react'


interface AreaProps {
    onEnter: (taskName: string) => void
}

export const Area: React.FC<AreaProps> = ({ onEnter }) => {

    const [inputText, setInputText] = useState('')

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter' && inputText !== '') {
            onEnter(inputText)
            setInputText('')
        }
    }

    return (
        <A.AreaStyled>
            <div className='image'>{'\u2795'}</div>
            <input type="text"
                placeholder='Adicione uma tarefa'
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
            />
        </A.AreaStyled>
    )
}