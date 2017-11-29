const path = require('path');

module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, {
        "extensions": [".js", ".jsx"]
    }],
    "strict": 0,
    "indent": ["error", 2],
    "max-len": ["error", 120],
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  }
};
