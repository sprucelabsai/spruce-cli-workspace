#!/usr/bin/env node

import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerminalInterface from '../interfaces/TerminalInterface'
import testUtil from '../tests/utilities/test.utility'
import { GraphicsTextEffect } from '../types/cli.types'

const term = new TerminalInterface(__dirname)

const dir = testUtil.resolveTestDir()

term.renderHeadline(`Clearing test cache at ${dir}.`)
diskUtil.deleteDir(dir)

term.renderLine('Test cache cleared!', [GraphicsTextEffect.Green])
