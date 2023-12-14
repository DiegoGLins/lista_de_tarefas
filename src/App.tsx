/* eslint-disable prefer-const */
/* eslint-disable no-mixed-spaces-and-tabs */

import * as Component from './App.styles'
import { Area } from './components/Area'
import ButtonDefault from './components/Button/ButtonDefault';
import { Alert, Button, IconButton, Snackbar, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import trashCanImage from './assets/trashCan.png';
import featherImage from './assets/Feather.png';
import MarioHiroshi from '/Mario-gif.gif'


import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ItemType } from './types/ItemType';
import { ItemStyled } from './components/ListItem/styles';
import BasicModal from './components/Modal';
import DialogConfirm from './components/DailogConfirm';
import AlertStyled from './components/AlertStyled';
import styles from './app.module.scss';

const API_BASE_URL = 'http://localhost:3000';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ItemType[]>([]);
  const [filter, setFilter] = useState<string>('Todas');
  const [inputText, setInputText] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [taskModal, setTaskModal] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<ItemType | undefined>();
  const [taskDelete, setTaskDelete] = useState<ItemType | undefined>()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)


  const fetchTasks = useCallback(() => {
    fetch(`${API_BASE_URL}/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => {
        console.error('Erro ao buscar tarefas:', error);
      });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const dataCreated = new Date()
  const day = dataCreated.getDate().toString().padStart(2, '0')
  const month = String(dataCreated.getMonth() + 1).padStart(2, '0');
  const year = String(dataCreated.getFullYear()).padStart(2, '0')

  const addTask = useCallback((name: string) => {

    const newTask: ItemType = {
      id: uuidv4(),
      name,
      done: false,
      createdAt: {
        dia: `${day}`,
        mes: `${month}`,
        ano: `${year}`
      }
    }


    fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newTask),
    }).then(response => {
      if (response.ok) {
        console.log('Tarefa adicionada com sucesso')
      }
    });
    setTasks(prevTasks => [...prevTasks, newTask]);
    setInputText('');
  }, [day, month, year])


  const editListTask = () => {
    const editedTaskIndex = tasks.findIndex(item => item.id === editTask?.id);
    const updatedTasks = [...tasks];
    updatedTasks[editedTaskIndex].name = taskModal;

    updatedTasks[editedTaskIndex].createdAt = {
      dia: day,
      mes: month,
      ano: year,
    };

    if (taskModal.length < 5) {
      return alert('Por favor digite uma descrição com no mínimo 5 caractéres');
    }

    fetch(`${API_BASE_URL}/tasks/${editTask?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTasks[editedTaskIndex]),
    }).then(response => {
      if (response.ok) {
        setTasks(updatedTasks);
        setEditModal(false);
        setTaskModal('');
      }
    });
  };


  const deleteListTask = () => {
    const index = tasks.findIndex(item => item.id === taskDelete?.id);
    const deleteTask = [...tasks];
    deleteTask.splice(index, 1);

    fetch(`${API_BASE_URL}/tasks/${taskDelete?.id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        setTasks(deleteTask);
        setOpenDeleteDialog(false);
        handleCloseAlert();
      }
    });
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'done') {
      return tasks.filter(task => task.done);

    } else if (filter === 'Pendentes') {
      return tasks.filter(task => !task.done);
    } else {
      return tasks;
    }
  }, [tasks, filter]);


  const order = (orderBy: string) => {
    const orderTasks = [...tasks];

    switch (orderBy) {
      case 'name':
        orderTasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'creationDate':
        orderTasks.sort((a, b) => {
          const dateA = new Date(
            Number(a.createdAt.ano),
            Number(a.createdAt.mes) - 1,
            Number(a.createdAt.dia)
          );
          const dateB = new Date(
            Number(b.createdAt.ano),
            Number(b.createdAt.mes) - 1,
            Number(b.createdAt.dia)
          );
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'status':
        orderTasks.sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1);
        break;
      default:
        break;
    }

    setTasks(orderTasks);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, done: !task.done };

        fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        }).then(response => {
          if (response.ok) {
            setTasks(prevTasks =>
              prevTasks.map(prevTask =>
                prevTask.id === taskId ? updatedTask : prevTask
              )
            );
          }
        });

        return updatedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
  };


  useEffect(() => {
    if (inputRef.current) {
      setInputText(inputText)
      console.log('Input value:', inputRef.current.value);
    }
  }, [inputText]);

  const openEditModal = (itemEdit: ItemType) => {
    setEditTask(itemEdit);
    setEditModal(true);
  };

  const openDeleteTask = (itemDelete: ItemType) => {
    setTaskDelete(itemDelete);
    setOpenDeleteDialog(true);
  }

  const handleCloseAlert = () => {
    setOpenAlert(true);
  }

  return (

    <Component.Container>
      <BasicModal isOpen={editModal} >
        <TextField fullWidth onChange={e => setTaskModal(e.target.value)} value={taskModal} type="text" label="Descrição da tarefa" />
        <Button color='error' variant='contained' onClick={() => setEditModal(false)}>Cancelar</Button>
        <Button color='success' variant='contained' onClick={editListTask}>Confirmar</Button>
      </BasicModal>
      <Component.Area>
        <Component.Header>
          <h1>Daily Quests ⚔</h1>
        </Component.Header>
        <section className={styles.retroSection}>
          <div className={styles.retroBotton}>
            <button onClick={() => addTask(inputText)}>Adicionar Tarefa</button>
          </div>
          <Area>
            <div className='imageMario'>
              <img src={MarioHiroshi} alt='Mario' style={{ display: 'flex', maxWidth: '110px', paddingTop: '8px 350 0px 0px' }} />
            </div>
            <div className={styles.retroTitleContainer}>
              <h3 className={styles.retroTitle}>Adicionar Quest</h3>
              <input className={styles.input} style={{ fontFamily: 'Pokemon GB', justifyContent: 'center', alignItems: 'center', height: '80px' }} type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
            </div>
          </Area>
        </section>

        <div style={{ marginTop: '50px', fontSize: '21px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <ButtonDefault actionConfirm={() => setFilter('Todas')} title={'Todas'} />
          <ButtonDefault actionConfirm={() => setFilter('Pendentes')} title={'Pendentes'} />
          <ButtonDefault actionConfirm={() => setFilter('done')} title={'Concluídas'} />
        </div>
        <div style={{ marginTop: '80px', fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '30px' }} className={styles.retroTitle}>
          <ButtonDefault actionConfirm={() => order('name')} title={'Ordenar por nome'} />
          <ButtonDefault actionConfirm={() => order('creationDate')} title={'Ordenar por data de criacao'} />
          <ButtonDefault actionConfirm={() => order('status')} title={'Ordenar por status'} />
        </div>
        {filteredTasks.map(task => (
          <div key={task.id}>
            <section>
              <ItemStyled done={task.done}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <div className={styles.checkboxGif}>
                    <div style={{ gap: '5px', display: 'flex', marginLeft: '35px', color: '#ccc', textDecoration: task.done ? 'line-through' : 'initial' }}>
                      <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ width: 'max-content', display: 'flex' }}>{task.name}</p>
                        <p>{`-`}</p>
                        <p id='retroRender'>{task.createdAt.dia}</p>
                        <p>{`/`}</p>
                        <p id='retroRender'>{task.createdAt.mes}</p>
                        <p>{`/`}</p>
                        <p id='retroRender'>{task.createdAt.ano}</p>
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: '30px', justifyContent: 'end', paddingInlineStart: '710px' }}>
                  <IconButton onClick={() => openEditModal(task)} style={{ color: '#25d60e' }} edge="start" aria-label="delete">
                    <img src={featherImage} alt="Delete" style={{ color: '#fff', maxWidth: '32px' }} />
                  </IconButton>
                  <IconButton onClick={() => openDeleteTask(task)} edge="end" aria-label="delete">
                    <img src={trashCanImage} alt="Delete" style={{ color: '#fff', maxWidth: '32px' }} />
                  </IconButton>
                </div>
              </ItemStyled>
            </section>
          </div>
        ))}
      </Component.Area>

      <AlertStyled>
        <Snackbar open={openAlert} autoHideDuration={1600} onClose={() => setOpenAlert(false)}>
          <Alert onClose={() => setOpenAlert(false)} severity="success">
            Tarefa excluída com sucesso!
          </Alert>
        </Snackbar>
      </AlertStyled>

      <DialogConfirm titleTask={'Deseja realmente excluir a tarefa'} descriptionTask={taskDelete?.name || ''} openDialog={openDeleteDialog} actionCancel={() => setOpenDeleteDialog(false)} actionConfirm={deleteListTask} />
    </Component.Container >

  );
};

export default App;
