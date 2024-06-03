import { useEffect, useMemo, useRef, useState } from "react"
import "./App.css"
import { ListItem } from "./ListItem/ListItem"

type Todo = {
  id: string
  checked: boolean
  description: string
}

function App() {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const listItems = useMemo(
    () =>
      todos.map(todo => (
        <ListItem checked={todo.checked} desc={todo.description} id={todo.id} />
      )),
    [todos]
  )

  const create = () => {
    setIsAdding(false)
    const newItem = { description: inputValue, id: "random", checked: false }
    const newTodos = [newItem, ...todos]
    setTodos(newTodos)
    setInputValue("")
  }

  useEffect(() => {
    if (isAdding) {
      inputRef!.current!.focus()
    }
  }, [isAdding])

  return (
    <div className="container">
      <h1>My Todo List</h1>
      {listItems}
      <div className="input-container" hidden={!isAdding}>
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
        />
        <button onClick={create}>Create</button>
      </div>
      <button onClick={() => setIsAdding(true)} hidden={isAdding}>
        Add New
      </button>
    </div>
  )
}

export default App
