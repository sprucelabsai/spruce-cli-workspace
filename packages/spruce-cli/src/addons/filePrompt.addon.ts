import inquirer from 'inquirer'
// @ts-ignore No defintion available
import fileSelect from 'inquirer-file-tree-selection-prompt'

inquirer.registerPrompt('file', fileSelect)
