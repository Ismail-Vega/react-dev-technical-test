# React Developer Technical Test

## Level 1 - Components and Local State

### Objective of level 1

Create a simple to-do list application.

### Requirements of level 1

- Create a `TodoItem` component that represents an individual task.
- Create a `TodoList` component that contains multiple `TodoItem` components.
- Use local state to manage the list of tasks and allow adding new tasks.
- Allow marking tasks as completed.
- Include a form to add new tasks with validations for required fields and minimum length.
- Implement a filter to show all tasks, only completed tasks, or only pending tasks.

## Level 2 - Routing and Global Context

### Objective of level 2

Expand the Todo List application to include multiple lists and manage the state globally.

### Requirements of level 2

- Add React Router to enable navigation between different task lists.
- Create a global context using `useContext` and `useReducer` to manage the state of all task lists.
- Allow the creation, editing (field validations for required fields, minimum length, etc.), and deletion of task lists.
- Create a confirmation popup component for task deletion.
