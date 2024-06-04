### This is a small practice using create-react-app to help understand some basic but important concepts. This app utilizes no state management tool or backend, but stresses the following areas:
- ### "shallow comparison" of state in React
  - when the state is a reference type, React compares the `reference value` of previous state and new state
  - a reference data type is one that can be accessed by reference rather than by value, such as objects, arrays, functions
  - a reference type's content can be mutated without changing the reference
  - hence for React to detect a change and triggers re-render, new state must have a difference reference value
- ### "shallow copy" of arrays
  - methods like `slice()`, `concat()`, `filter()`, or the spread operator `...` creates a new array with new reference value.
  - why is it called a "shallow copy"? Because the references to elements in the new array have not changed.
- ### what should be a `state` or not
  - keep in mind the "data-driven" philosophy, the data that is used to dispaly UI or relfect UI changes should be a state, otherwise, we should think of a better place or another way to manage such data
- ### `useRef` usage case
  - is normally used to keep track of an entity that persists thru renders. The entity can be a value, or a real DOM node
  - in our app, it is used to represent the input element when adding a new todo
  - since the real DOM only shows up when a state `isAdding` is true, the assignment of `ref.current` occurs in `useEffect` 
- ### data flow from child to parent
  - parent component `App` needs a set of data to display on the first-render and re-renders. It will be the `todos` state.
  - data change of each todo is done on the child component `<TodoItem>`. Eeach todo item can change its own `checked` status, and delete itself
  - in other words, child component needs to be able to edit parent's state
  - we achieve this by creating callbacks in the parent and pass them down to child as props

## Performance improvement
### How many times has a callback be memoized?
1. A natural response of writing a callback   
   Consider the following use case: we create a `handleCheck` callback in `App` and pass it to `TodoItem` to handle the `checked` property.<br>
   Easily, we can modify the `todos` state like below and add dependency `todos`

  ```
  const App = () =>{
    const [todos, setTodos] = useState<Todo[]>(data.todos)

    const handleCheck = useCallback((id: string) => {
      const todoBeingEdited = todos.find(todo => todo.id === id)
      todoBeingEdited!.checked = !todoBeingEdited?.checked
      setTodos([...todos])
    }, [todos])
  }
  ```
2. use `ref` to track how many time a callback has been memoized<br>
  This is a great use case of refs to track data thru renders

  ```
  const func = useRef<null | ((id: string) => void)>(null)
  const count = useRef(0)

  if (func.current !== handleCheck) {
    func.current = handleCheck
    count.current += 1
    console.log("handleCheck memorized times ", count.current)
  }

  ```
  No doubt that when `App` first renders, the callback is memoized 1 time.<br>
  However, after we click the checkbox once, we see the callback is memoized 3 times. Every time we click any checkbox, the callback will be memoized twice. Why is that?

3. strict mode in development environment<br>
   Strict mode is enabled by default in a development mode. In strict mode, React intentionally double-invokes the component render function to help identify any potential
   side effects or unexpected behavior. As a result, the comparison block is executed twice, leading to the appearance of the handleCheck callback being memoized twice.

4. Put the comparison block inside a `useEffect` to accurately track how many times a callback is memoized. 
```
useEffect(()=> {
  if (func.current !== handleCheck) {
    func.current = handleCheck
    count.current += 1
    console.log("handleCheck memorized times ", count.current)
  }
}, [handleChecked])
```

5. Now we see that every time we check/uncheck an item, the app re-renders once, and the callback is memoized once
### What if the callback is expensive?
Is there a way to reduce the amount of memoize and still be able to update state? 
```
 const handleCheck = useCallback(
    (id: string) => {
      setTodos(prevState =>
        prevState.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      )
    },
    []
  )
```
## Todos
- [ ] Add styles to app (responsive)