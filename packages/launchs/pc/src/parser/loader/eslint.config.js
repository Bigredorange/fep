/**
 * eslint配置
 */

 const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: [
              path.resolve(__dirname, '../../../node_modules'),
              path.resolve(process.cwd(), './node_modules'),
              'node_modules'
            ],
            extensions: ['.js', '.ts', '.vue', '.json', 'scss'],
          }
        }
      }
    }
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-lonely-if': 'off',
    'no-param-reassign': 'off',
    'max-len': [1, 200],
    'linebreak-style': 'off',
    'default-case': 'off',
    'prefer-promise-reject-errors': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'no-unused-vars': ["error", { "args": "after-used" }],
    'import/prefer-default-export': 'off',
    'vue/no-v-html': 'off',
  },
};
