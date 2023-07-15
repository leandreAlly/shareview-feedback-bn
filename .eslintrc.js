module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
};
