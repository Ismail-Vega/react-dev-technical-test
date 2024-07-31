module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, "cypress/globals": true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "jest.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "react",
    "jsx-a11y",
    "complexity",
    "import",
    "cypress",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-console": "warn",
    semi: ["error", "always"],
    "react/prop-types": "warn",
    "jsx-a11y/alt-text": "warn",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "warn",
    complexity: ["error", { max: 15 }],
    "max-lines": ["error", { max: 300 }],
    "max-depth": ["error", 4],
    "max-params": ["error", 4],
    "import/order": [
      "error",
      {
        groups: [["builtin", "external", "internal"]],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
