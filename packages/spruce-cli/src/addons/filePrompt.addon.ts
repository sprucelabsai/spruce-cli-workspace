// @ts-ignore No definition available
import inquirer from 'inquirer'
import fileSelect from 'inquirer-file-tree-selection-prompt'

inquirer.registerPrompt('file', fileSelect)
