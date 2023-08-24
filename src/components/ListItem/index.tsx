
import { useState } from 'react'
import { Item } from '../../types/Item'
import { ItemStyled } from './styles'

interface ListItemProps {
    item: Item;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {

    const [isChecked, setIsChecked] = useState(item.done)


    return (
        <ItemStyled done={isChecked}>
            <input type='checkbox' checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />
            <label>{item.name}</label>
        </ItemStyled>
    )
}

export default ListItem