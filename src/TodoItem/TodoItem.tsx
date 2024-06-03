import "./list-item.css"

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
  return (
    <div className="list-item" key={data.id}>
      <input
        className="list-item__checkbox"
        placeholder={`${data.checked}`}
        onClick={() => handleCheck(data.id)}
      />
      <span className="list-item__description">{data.description}</span>
      <span
        className="list-item__delete-button"
        onClick={() => handleRemove(data.id)}
      >
        Delete
      </span>
    </div>
  )
}
