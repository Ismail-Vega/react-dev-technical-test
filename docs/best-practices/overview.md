# Best Practices and Conventions

## Code Style

### ESLint

We use ESLint to enforce code quality and maintain consistency across the codebase. Here are the key practices:

- **Plugins and Custom Rules**: We use various plugins and custom rules tailored to our project's needs. This ensures adherence to best practices and code quality.
- **Formatting**: Consistent formatting is enforced to maintain readability. This includes setting up rules for indentation, line length, and spacing.
- **Error Handling**: ESLint rules and a simple ErrorBoundary component wrapper help catch common errors and potential issues before they become problematic.

### Style Guides

We follow specific style guides to maintain a consistent codebase:

- **TypeScript**: We adhere to the Airbnb JavaScript Style Guide, with some project-specific adjustments.
- **React**: We follow the React community's best practices, including the use of hooks, functional components, and proper state management.
- **Material-UI**: We use Material-UI components and adhere to their styling and layout conventions.

## Component Naming and Structure

### Naming Conventions

- **Components**: Components are named using PascalCase. For example, `TodoList`, `ListsTable`, and `TodoItem`.
- **Props and State**: Props and state variables are named using camelCase. For example, `isPopupOpen`, `isLoading`, and `todoList`.

### Component Structure

- **File Organization**: Each component has its own directory within the `src/components` folder. The directory contains the component file (e.g., `TodoItem.tsx`), and tests (e.g., `TodoItem.test.tsx`).
- **Component Files**: Each component file should ideally contain only one component and its related logic to keep components modular and easier to maintain. However, if a component contains an inner component that is only used within that component, it's acceptable to include the inner component in the same file. This approach helps maintain cohesion and encapsulation for closely related components, making the parent component easier to understand and manage.

- **Style Management**: Since the app uses Material-UI components and does not employ custom CSS, styling is handled through Material-UI’s built-in styling solutions, such as the `sx` prop, `makeStyles`, or `styled` utility. This approach keeps component files focused on logic and structure, as the styling is encapsulated within the Material-UI framework and its provided mechanisms.

- **Tests**: Test files are placed in a `cypress/e2e` directory for end-to-end tests and for unit and integration tests Test files are named using the component name followed by `.test.tsx` and are placed in the same directory as their respective component. This organization keeps test files logically separated based on their scope and simplifies test management.

### Component Composition

- **Reuse**: Components are designed to be reusable. Common UI elements are extracted into separate components to avoid duplication.
- **Props and State**: Components should receive data through props and manage state internally or through context/providers, avoiding global state modifications directly within components.

### Component Documentation

- **JSDoc**: Use JSDoc comments to document component props and methods. This helps in understanding the component’s API and usage.

## Summary

By adhering to these best practices and conventions, we ensure a consistent and maintainable codebase that is easy to understand and work with. Following ESLint rules and a structured approach to component naming and organization helps in maintaining code quality and clarity throughout the project.
