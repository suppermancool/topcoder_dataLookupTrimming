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
        name: 'outputlog', 
        type: String, 
        alias: 'l',
        typeLabel: '[underline]{path}', 
        defaultValue: defaultConfig.exportCsvLogPath, 
        description: 'Path to output csv log file. Default value: ' +  defaultConfig.exportCsvLogPath
    },
    { 
        name: 'maskcreditcard', 
        type: String,
        typeLabel: '[underline]{string}', 
        defaultValue: defaultConfig.maskCreditCard, 
        description: 'Mask to replace real card number. Default value: ' +  defaultConfig.maskCreditCard
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