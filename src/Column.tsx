import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { useAppState } from './state/AppStateContext'
import { Card } from './Card'
import { addTask, moveList, moveTask, setDraggedItem } from './state/actions'
import { useRef } from 'react'
import { useItemDrag } from './utils/useItemDrag'
import { useDrop } from "react-dnd"
import { isHidden } from './utils/isHidden'
import { DragItem } from './DragItem'


type ColumnProps = {
  text: string
  id: string
  isPreview? : boolean
}
export const Column = ({text, id, isPreview } : ColumnProps) => {
  const {draggedItem, getTasksByListId, dispatch} = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null)
  
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN"){
        if (!draggedItem) {
          return
        }
        if (draggedItem.type === "COLUMN") {
          if (draggedItem.id === id) {
            return
          }
          dispatch(moveList(draggedItem.id, id))
        }
      }
      else {
        if (!draggedItem) {
          return
        }
        if (draggedItem.type === "CARD"){
          if (draggedItem.columnId === id) {
            return
          }
          if (tasks.length) 
          {
            return 
          }
          dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
          dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
        }
      }  
    }})
  
  const {drag} = useItemDrag({type: "COLUMN", id, text})
  
  drag(drop(ref))

  return (
    <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (task && <Card text={task.text} columnId={id} id={task.id} key={task.id}/>))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text,id))}
        dark
      />
    </ColumnContainer>
  )
}
