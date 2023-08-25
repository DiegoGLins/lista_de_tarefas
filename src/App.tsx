
import * as Component from './App.styles'
import { Area } from './components/Area'
import ButtonDefault from './components/Button/ButtonDefault';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ItemType } from './types/ItemType';
import { ItemStyled } from './components/ListItem/styles';


const App: React.FC = () => {
  const [tasks, setTasks] = useState<ItemType[]>([]);
  const [filter, setFilter] = useState<string>('Todas');
  const [inputText, setInputText] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTask = useCallback((name: string) => {
    const newTask: ItemType = {
      id: tasks.length + 1,
      name,
      done: false,
    };
    setInputText('')
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [tasks]);

  const toggleTask = useCallback((taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      setInputText(inputText)
      console.log('Input value:', inputRef.current.value);
    }
  }, [inputText]);

  const filteredTasks = useMemo(() => {
    if (filter === 'done') {
      return tasks.filter(task => task.done);
    } else if (filter === 'Pendentes') {
      return tasks.filter(task => !task.done);
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  return (

    <Component.Container>
      <Component.Area>
        <Component.Header>
          Lista de Tarefas
        </Component.Header>
        <Area>
          <input type="text"
            placeholder='Adicione uma tarefa'
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <button onClick={() => addTask(inputText)}>Adicionar Tarefa</button>
        </Area>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <ButtonDefault actionConfirm={() => setFilter('Todas')} title={'Todas'} />
          <ButtonDefault actionConfirm={() => setFilter('Pendentes')} title={'Pendentes'} />
          <ButtonDefault actionConfirm={() => setFilter('done')} title={'Concluídas'} />
        </div>

        {filteredTasks.map(task => (
          <div key={task.id}>
            <ItemStyled done={task.done}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <p style={{ color: '#ccc', textDecoration: task.done ? 'line-through' : 'initial' }}>
                {task.name}
              </p>
              <div style={{ justifyContent: 'flex-end', paddingInlineStart: '20px' }}>
                <IconButton style={{ color: '#25d60e' }} edge="end" aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton style={{ color: '#e3f42a' }} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            </ItemStyled>
          </div>
        ))}

      </Component.Area>
    </Component.Container >

  );
};

export default App;
