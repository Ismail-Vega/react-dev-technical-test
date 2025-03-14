# Setup Guide

## Project Setup

This guide provides instructions to set up and run the project, including configurations for development, linting, testing, and building.

### Prerequisites

- Node.js (version 18 or later)
- npm or Yarn

### Installation

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Use npm or Yarn to install project dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Development

1. **Start the Development Server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The app will be available at <http://localhost:5173>

2. **Build the Project**

    ```bash
    npm run build
    # or
    yarn build
    ```

### Linting

1. **Run ESLint**

    ```bash
    npm run lint
    # or
    yarn lint
    ```

### Testing

1. **Run Unit and Integration Tests**

    ```bash
    npm test
    # or
    yarn test
    ```

2. **Run Tests with Coverage**

    ```bash
    npm run test:coverage
    # or
    yarn test:coverage
    ```

3. **Run Tests in Watch Mode**

    ```bash
    npm run test:watch
    # or
    yarn test:watch
    ```

4. **End-to-End Testing with Cypress**

    ```bash
    npx cypress open
    # or
    yarn cypress open
    ```

    To run Cypress tests in headless mode:

    ```bash
    npx cypress run
    # or
    yarn cypress run
    ```

### Configuration Files

- **`.eslintrc.cjs`**: ESLint configuration for code linting, including rules for React, TypeScript, and accessibility.
- **`cypress.config.ts`**: Cypress configuration for end-to-end testing with the base URL set to the development server.
- **`jest.config.js`**: Jest configuration for unit and integration tests, including coverage collection and transformation settings.
- **`tsconfig.json`**: TypeScript configuration specifying compiler options, module resolution, and type definitions.
- **`vite.config.ts`**: Vite configuration for the build tool, including React plugin and optimization settings.

### Folder Structure

- **`src/`**: Source code of the application, including components, pages, services, and store.
- **`public/`**: Static assets such as images and the `index.html` file.
- **`tests/`**: Test files for unit, integration, and end-to-end testing.

For detailed documentation on specific components and features, refer to the `docs/` directory.
