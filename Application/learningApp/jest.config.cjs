module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Применение babel-jest для всех JS/TS файлов
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Поиск тестовых файлов
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Указываем файл настройки
};