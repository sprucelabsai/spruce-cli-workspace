// @ts-ignore
import fileSelect from 'inquirer-file-tree-selection-prompt'
import inquirer from 'inquirer'

inquirer.registerPrompt('file', fileSelect)
