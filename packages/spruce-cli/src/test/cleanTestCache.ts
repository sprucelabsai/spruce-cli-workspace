#!/usr/bin/env node

import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerminalInterface from '../interfaces/TerminalInterface'
import { GraphicsTextEffect } from '../types/cli.types'
import testUtil from '../utilities/test.utility'

const term = new TerminalInterface(__dirname)

const dir = testUtil.resolveCacheDir()

term.renderHeadline(`Clearing test cache at ${dir}.`)
diskUtil.deleteDir(dir)

term.renderLine('Test cache cleared!', [GraphicsTextEffect.Green])
