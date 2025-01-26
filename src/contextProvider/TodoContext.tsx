import  { createContext } from 'react'
import { TodoListContextInterface } from './TodoContextProvider'

const TodoContext = createContext<TodoListContextInterface | undefined>(undefined)

export default TodoContext
