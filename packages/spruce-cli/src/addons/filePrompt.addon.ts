import fileSelect from 'inquirer-file-tree-selection-prompt'
import inquirer from 'inquirer'
// @ts-ignore No definition available

inquirer.registerPrompt('file', fileSelect)
