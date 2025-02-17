/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ["/*", "!/app", "!/tests", "*.generated.ts"],
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:sonarjs/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["sonarjs", "@typescript-eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    "react/jsx-no-target-blank": "off",
    "sonarjs/no-duplicate-string": "warn",
    "sonarjs/no-small-switch": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/restrict-template-expressions": "warn",
    camelcase: ["error", { properties: "always", allow: ["^v2_", "^V2_"] }],
    "import/no-unused-modules": [
      1,
      {
        unusedExports: true,
        ignoreExports: ["app/routes/*", "app/root.tsx", "app/entry.server.tsx"],
      },
    ],
  },
};
