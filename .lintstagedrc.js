const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix --ext .js,.jsx,.ts,.tsx ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

const buildTypeCheckCommand = (filenames) =>
  `bash -c tsc --noEmit --pretty ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    buildEslintCommand,
    buildPrettierCommand,
    buildTypeCheckCommand,
  ],
}
