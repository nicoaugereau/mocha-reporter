# mocha-reporter

<img align="right" src="./img/mocha-reporter1.0.0.png" alt="Mocha Reporter" width="55%" />

Merge several [Mochawesome](https://github.com/adamgruber/mochawesome) JSON reports and generate html report like [Mochawesome-report-generator](https://github.com/adamgruber/mochawesome-report-generator) but little bit different. No js and no external links

## Features

- Summary tab with graph, informations and failed tests list 
- Details tab with all tests
- Test informations status and duration
- Test code for each step
- Test screenshot if failed


## Installation

via `npm`:

```
$ npm install mocha-reporter --save-dev
```

## Examples

### JavaScript API

```javascript
const { merge } = require('mocha-reporter')

// See Params section below
const options = {
  files: [
    './report/*.json',

    // you can specify more files or globs if necessary:
    './mochawesome-report/*.json',
  ],
}

merge(options)
```

### CLI

```
$ npx mocha-reporter -f ./report/*.json -r report/mocha-reporter
```

You can specify as many paths as you wish:

```
$ npx mocha-reporter -f ./report/*.json ./mochawesome-report/*.json r report/mocha-reporter
```

### Params

- `files`: list of source report file paths. Can include glob patterns.
- Aliases: `-f | --files` or first positional argument
- Defaults to `["./mochawesome-report/mochawesome*.json"]`.
#
- `reportDir`: a file path to the bundled results. Should be a `json` file 
- Aliases: `-r | --reportDir`
- Defaults to `stdout`.

## [Cypress](https://github.com/cypress-io/cypress)

The motivation to create this custom report is tu use [mochawesome](https://github.com/adamgruber/mochawesome) together with [Cypress](https://github.com/cypress-io/cypress) and to bypass some technical constraints.

Since the version `3.0.0`, Cypress runs every spec separately, which leads to generating multiple mochawesome reports, one for each spec. `mochawesome-merge` can be used to merge these reports and then generate one HTML report for all your cypress tests.

First, configure `cypress.json`:

```jsonc
{
  // use mochawesome reporter as usually
  "reporter": "mocha-reporter",
  "reporterOptions": {
    // path to generate report.json and report.html
    "reportDir": "mocha/mochareports/",
  }
}
```

Then, write your custom script to run `cypress` together with `mochawesome-merge`:

```javascript
const cypress = require('cypress')
const { merge } = require('mocha-reporter')

cypress.run().then(
  () => {
    generateReport(options)
  },
  error => {
    generateReport()
    console.error(error)
    process.exit(1)
  }
)

function generateReport() {
  return merge()
}
```
