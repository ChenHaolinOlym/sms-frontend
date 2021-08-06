import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['**/tests/unit/**/*.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.vue', '!src/main.ts', '!shims-vue.d.ts', '!vite-env.d.ts'],
}

export default config
