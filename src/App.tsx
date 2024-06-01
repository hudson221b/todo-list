import { useMemo, useState } from "react"
import "./App.css"

function App() {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")

  const listItems = useMemo(() => todos.map(todo => <li>{todo}</li>), [todos])

  const create = () => {
    setIsAdding(false)
    const newTodos = [inputValue, ...todos]
    setTodos(newTodos)
    setInputValue("")
  }
  return (
    <div className="container">
      <h1>My Todo List</h1>
      {listItems}
      <div className="input-container" hidden={!isAdding}>
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
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
