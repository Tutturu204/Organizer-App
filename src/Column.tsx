import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { FC, ReactNode } from 'react'
import { useAppState } from './state/AppStateContext'
import { Card } from './Card'

type ColumnProps = {
  text: string
  id: string
}
export const Column = ({text, id } : ColumnProps) => {
  const {getTasksByListId} = useAppState()
  const tasks = getTasksByListId(id)
  
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (<Card text={task.text} id={task.id} key={task.id}/>))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  )
}
