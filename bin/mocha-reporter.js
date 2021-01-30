#!/usr/bin/env node

const { merge } = require('../lib/index')
const yargs = require('yargs')
const path = require('path')
const fs = require('fs')

yargs
  .command('$0 [files..]', 'Merge report files', yargs => {
    yargs.positional('files', {
      description: 'input files',
      type: 'array',
      alias: ['f'],
    })
  })
  .option('r', {
    alias: 'reportDir',
    demandOption: false,
    describe: 'Output file path',
    type: 'string',
  })
  .option('f', {
    alias: 'files',
    demandOption: false,
    describe: 'Input files',
    type: 'array',
  })
  .help()

const { files, reportDir, infos } = yargs.argv

merge({ files, infos, reportDir }).then(
  report => {
    //const content = JSON.stringify(report, null, 2)
    const content = report
    if (reportDir) {
      const outputFilePath = path.resolve(process.cwd(), reportDir)
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true })
      fs.writeFileSync(`${outputFilePath}/report.html`, content, { flag: 'w' })
      console.info(`Reports merged to ${outputFilePath}/report.html`)
    } else {
      process.stdout.write(content)
    }
  },
  error => {
    console.error('ERROR: Failed to merge reports\n')
    console.error(error)
    process.exit(1)
  }
)
