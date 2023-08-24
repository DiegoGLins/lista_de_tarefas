import styled from 'styled-components'

interface ItemStyledProps {
    done: boolean;
}

export const ItemStyled = styled.div<ItemStyledProps>`
    display: flex;
    background-color: #20212C;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;

    input {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    }

    label {
    color: #ccc;
    text-decoration: ${props => props.done ? 'line-through' : 'initial'} ;
    }`
