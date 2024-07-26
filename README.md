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

## Level 3 - API Integration and Optimization

### Objective of level 3

Integrate the application with an external API and optimize performance.

### Requirements of level 3

- Integrate the application with an API (you can simulate one with jsonplaceholder or any other REST API).
- Add a service layer to interact with the API.
- Use `useEffect` to make API requests and load the task list data.
- Implement a simple data cache to avoid multiple API requests for the same data.
- Optimize the application to improve performance (e.g., through memoization and on-demand rendering).
