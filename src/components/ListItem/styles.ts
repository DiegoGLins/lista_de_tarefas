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
    margin-top: 20px;
    justify-content: center;

    input {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    }
    
    P {
        padding-inline-start: 10px;
        font-size: 15px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    
    
    `
