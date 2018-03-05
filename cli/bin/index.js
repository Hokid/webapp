#!/usr/bin/env node

const commander = require('commander');

const InitCommandHandler = require('../lib/init');

commander
  .version(require('../package').version)
  .usage('<command> [options]');

const initCmd = new InitCommandHandler(commander);

commander.parse(process.argv);
