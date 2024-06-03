import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { v4 } from "uuid"
import "./App.css"
import { TodoItem, Todo } from "./TodoItem/TodoItem"
// import data from "./data.json"

function App() {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCheck = useCallback((id: string) => {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    )
  }, [])

  const handleRemove = useCallback((id: string) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id))
  }, [])

  const listItems = useMemo(
    () =>
      todos.map(todo => (
        <TodoItem
          key={todo.id}
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
