# Frontend Components

- **App**: The main component that serves as the entry point. It includes `AppForm`, `AppModal`, and `ListsTable`.

- **AppForm**: A form component used for adding and editing lists. It handles the submission of list data and integrates with the `AppModal` for user interactions.

- **AppModal**: A modal component for displaying forms and other content. It is used to show the `AppForm` and other forms within a modal dialog.

- **ListsTable**: Displays the list of to-do lists with options to edit or delete them. It uses the `ListNavItem` component to render individual items in the list.

- **ConfirmationPopup**: A component that displays a confirmation dialog for user actions such as deleting a to-do or list. It ensures that users confirm their actions before proceeding.

- **ErrorBoundary**: A component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI. It prevents crashes from propagating and provides a user-friendly error message.

- **ListNavItem**: A navigation item component used within the `ListsTable` to render each list entry. It includes the visual representation and interaction options for each list item.

- **NavList**: A list component used for navigation within the application. It displays a list of navigational items or links, facilitating easy access to different parts of the application.

- **SearchBar**: A component that allows users to search through to-do lists or items. It integrates with the `ListsTable` and `SideBarLayout` components to filter and display search results.

- **SideBarLayout**: The main sidebar layout component that houses navigation and filtering components. It includes `DrawerContent` for rendering the sidebar content and integrates with `NavList` and `SearchBar`.

- **DrawerContent**: A subcomponent of `SideBarLayout` responsible for rendering the content inside the sidebar drawer. It manages the display of navigation items and other sidebar content.

- **TodoContainer**: A container component that holds and organizes the to-do items. It interacts with `TodoList` and `TodoItem` components to display and manage individual to-do items.

- **TodoItem**: A component representing a single to-do item. It includes functionality for marking as complete or incomplete, editing, and deleting the item.

- **TodoList**: A component that aggregates multiple `TodoItem` components into a list. It provides a structured view of all to-dos associated with a particular list.

- **TodoListPage**: A page component that displays a specific to-do list. It includes the `TodoContainer` and other UI elements for managing and interacting with the list and its items.

- **AppRouter**: Manages routing within the application. It sets up routes for different pages and components, facilitating navigation between various parts of the app.

- **apiClient**: A service for making HTTP requests to the API. It includes methods for performing CRUD operations and handling responses.

- **apiResponseHandler**: Handles the responses from API requests, including error handling and response transformation.

- **fetchFromApi**: A utility function for fetching data from the API. It integrates with `apiClient` and `apiResponseHandler` to perform and manage API requests.

- **todoListsApi**: An API slice for managing to-do list data. It includes endpoints for fetching, creating, updating, and deleting to-dos.

- **todoListsSlice**: A Redux slice for managing the state of to-do lists. It includes actions and reducers for interacting with the `todoListsApi` and updating the Redux store.

- **transformTodos**: A utility function for transforming and normalizing to-do data from the API.

- **index.ts**: The entry point for each directory or component module, re-exporting components and functions for easier imports.
