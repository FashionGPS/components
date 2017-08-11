module.exports = {
  extends: ['standard', 'standard-react'],
  parser: 'babel-eslint',
  plugins: ['standard', 'promise'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'jsx-quotes': ['error', 'prefer-double']
  },
  globals: {
    React: false
  },
}
