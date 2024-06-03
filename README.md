### This is a small practice using create-react-app to help understand some basic but important concepts. This app utilizes no state management tool or backend, but stresses the following areas:
- ### "shallow comparison" of state in React
  - when the state is a reference type, React compares the `reference value` of previous state and new state
  - a reference data type is one that can be accessed by reference rather than by value, such as objects, arrays, functions
  - a reference type's content can be mutated without changing the reference
  - hence for React to detect a change and triggers re-render, new state must have a difference reference value
- ### what should be a `state` or not
  - keep in mind the "data-driven" philosophy, the data that is used to dispaly UI or relfect UI changes should be a state, otherwise, we should think of a better place or another way to manage such data
- ### `useRef` usage case
  - is normally used to keep track of an entity that persists thru renders. The entity can be a value, or a real DOM node
  - in our case, it is used to represent the input element when adding a new todo
  - since the real DOM only shows up when a state `isAdding` is true, the assignment of `ref.current` occurs in `useEffect` 
- ### data flow from child to parent
  - parent needs a set of data to display on the first-render (App has all todos as a state)
  - the individual change of each todo is done on the child level (each todo can change its own `checked` status, and delete itself)
  - in other words, child component needs to be able to edit parent's state
  - we achieve this by creating callbacks in the parent and pass them down to child as props
