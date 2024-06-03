import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { v4 } from "uuid"
import "./App.css"
import { ListItem, Todo } from "./ListItem/ListItem"

function App() {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCheck = useCallback(
    (id: string) => {
      const todoBeingEdited = todos.find(todo => todo.id === id)
      todoBeingEdited!.checked = !todoBeingEdited?.checked
      setTodos([...todos])
    },
    [todos]
  )

  const handleRemove = useCallback(
    (id: string) => {
      const indexBeingRemoved = todos.findIndex(todo => todo.id === id)
      todos.splice(indexBeingRemoved, 1)
      setTodos([...todos])
    },
    [todos]
  )

  const listItems = useMemo(
    () =>
      todos.map(todo => (
        <ListItem
          data={todo}
          handleCheck={handleCheck}
          handleRemove={handleRemove}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos]
  )

  const create = () => {
    const newItem = { description: inputValue, id: v4(), checked: false }
    const newTodos = [newItem, ...todos]
    setTodos(newTodos)
    setInputValue("")
    setIsAdding(false)
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
      {isAdding ? (
        <div className="input-container">
          <input
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            ref={inputRef}
          />
          <button onClick={create}>Create</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add New</button>
      )}
    </div>
  )
}

export default App
