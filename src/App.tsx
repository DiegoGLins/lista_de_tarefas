import { useState } from 'react'
import * as Component from './App.styles'
import { v4 as createUuid } from "uuid";
import { Item } from './types/Item'
import ListItem from './components/ListItem/index'
import { Area } from './components/Area'

const App = () => {

  const id = createUuid()
  const [list, setList] = useState<Item[]>([])


  const handleAddTask = (taskName: string) => {
    const newList = [...list]
    newList.push({
      id: id,
      name: taskName,
      done: false
    })
    setList(newList)
  }



  return (
    <Component.Container>
      <Component.Area>
        <Component.Header>
          Lista de Tarefas
        </Component.Header>
        <Area onEnter={handleAddTask} />
        {list.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}

      </Component.Area>
    </Component.Container>
  );
}

export default App