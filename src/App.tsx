import { useState } from "react"
import "./App.css"

function App() {
  const [isAdding, setIsAdding] = useState(false)

  const create = () => {
    setIsAdding(false)
  }
  return (
    <div className="container">
      <h1>My Todo List</h1>
      <li>sample todo</li>
      <div className="input-container" hidden={!isAdding}>
        <input />
        <button onClick={create}>Create</button>
      </div>
      <button onClick={() => setIsAdding(true)} hidden={isAdding}>
        Add New
      </button>
    </div>
  )
}

export default App
