import inquirer from 'inquirer'
// @ts-ignore No definition available
import fileSelect from 'inquirer-file-tree-selection-prompt'

inquirer.registerPrompt('file', fileSelect)
