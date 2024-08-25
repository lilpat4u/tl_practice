// module.exports = {
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Применение babel-jest для всех JS/TS файлов
//   },
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
//   testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Поиск тестовых файлов
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Указываем файл настройки
// };

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['/Users/danil/tl_practice-2/Application/learningApp/jest.setup.js'], // Убедитесь, что путь верный
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//     '^.+\\.jsx?$': 'babel-jest',
//   },
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['/Users/danil/tl_practice-2/Application/learningApp/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};