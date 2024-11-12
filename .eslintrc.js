module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest",   
  
    },
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn", // Advierte sobre variables no utilizadas
      "no-console": "warn", // Advierte sobre el uso de console.log
      "eqeqeq": "error", // Requiere el uso de === y !==
    },
  };