import "./list-item.scss"

export type Todo = {
  id: string
  checked: boolean
  description: string
}

export const TodoItem = (props: {
  data: Todo
  handleCheck: (id: string) => void
  handleRemove: (id: string) => void
}) => {
  const { data, handleCheck, handleRemove } = props
  const inputClassNames = data.checked
    ? "todo-item__checkbox checked"
    : "todo-item__checkbox"

  const descClassNames = data.checked
    ? "todo-item__description checked"
    : "todo-item__description"
  return (
    <div className="todo-item" key={data.id}>
      <div
        className={inputClassNames}
        onClick={() => handleCheck(data.id)}
      >
        {data.checked ? "Y" : null}
      </div>
      <span className={descClassNames}>{data.description}</span>
      <span
        className="todo-item__delete-button"
        onClick={() => handleRemove(data.id)}
      >
        Delete
      </span>
    </div>
  )
}
