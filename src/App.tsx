import React, { FC, ReactNode } from 'react'
import { AppContainer } from './styles'
import { AddNewItem } from './AddNewItem'
import { Column } from './Column'
import { Card } from './Card'
import { useAppState } from './state/AppStateContext'

export const App: FC = () => {

  const {lists} = useAppState()
  
  return (
    <AppContainer>
      
      {/*
      <Column text="To Do">
        <Card text="Generate app scaffold" />{' '}
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />{' '}
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
    */}
      {lists.map((list)=> (
        <Column text={list.text} key={list.id} id={list.id}/>
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  )}