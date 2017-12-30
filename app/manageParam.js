const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const defaultConfig = require('./defaultConfig')

const optionDefinitions = [
    { 
        name: 'input', 
        type: String, 
        alias: 'i',
        typeLabel: '[underline]{path}', 
        defaultValue: defaultConfig.importCsvPath, 
        description: 'Path to input csv file. Default value: ' +  defaultConfig.importCsvPath
    },
    { 
        name: 'output', 
        type: String, 
        alias: 'o',
        typeLabel: '[underline]{path}', 
        defaultValue: defaultConfig.exportCsvPath, 
        description: 'Path to output csv file. Default value: ' +  defaultConfig.exportCsvPath
    },
    { 
        name: 'mask', 
        type: String, 
        alias: 'm',
        typeLabel: '[underline]{string}', 
        defaultValue: defaultConfig.mask, 
        description: 'Mask to replace real card number. Default value: ' +  defaultConfig.mask
        },
    { 
        name: 'help', 
        type: Boolean, 
        alias: 'h',
        defaultValue: false, 
        description: 'Show params structure.'
        }
  ]
  const options = commandLineArgs(optionDefinitions)

  if (options.help) {
    showCmdLineUsage()
  }
  
  function showCmdLineUsage() {
      const sections = [
          {
            header: 'Params',
            optionList: optionDefinitions
          }
        ]
        const usage = getUsage(sections)
        console.log(usage)
  }

  module.exports = options;