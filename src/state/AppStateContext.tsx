import { createContext, useReducer, Dispatch, useContext, FC, ReactNode } from 'react'
import { List, Task, AppState, appStateReducer } from './AppStateReducer'
import { Action } from './actions'
import { DragItem } from '../DragItem'


type AppStateContextProbs = {
  draggedItem: DragItem | null,
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

//create context fofr the applciation
const AppStateContext = createContext<AppStateContextProbs>(
  {} as AppStateContextProbs,
)
//use context
//here we define a custom hook
export const useAppState = () => {
    return useContext(AppStateContext)
}

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn to earn TypeSctipt' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
}

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  const { draggedItem, lists } = state
  const getTasksByListId = (id: string) => {
    return lists.find(list => list.id === id)?.tasks || []
  }
  return (
    <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}


