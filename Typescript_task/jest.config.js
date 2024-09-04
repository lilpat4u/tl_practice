module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Применение babel-jest для всех JS/TS файлов
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'Typescript_task/types/CardSet.ts': 'Typescript_task/node_modules/uuid/dist/rng.js',
  },
};