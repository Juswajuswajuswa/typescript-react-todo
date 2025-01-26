export interface User {
  username: string;
  password: string;
}


export interface TodoList {
  id: number,
  title: string,
  completed: boolean
}

export interface ListContainer {
  id: number
  listName: string,
  addedDate: Date
  todos: TodoList[]
}