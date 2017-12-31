# topcoder_dataLookupTrimming

## Installation

To install npm  dependencies run:

> npm install

## Start the Application

> npm run main

## Show parameter usage

> npm run main -- -h

## Parameter usage
Params <br />
 <br />
  -i, --input :    Path to input csv file. Default value: rc/pci_example.csv <br />
  -o, --output :   Path to output csv file. Default value: rc/export_pci_example.csv <br />
  -l, --outputlog path      Path to output csv log file. Default value: rc/export_pci_example_log.csv
  --maskcreditcard string   Mask to replace real card number. Default value: undefined <br />
  -h, --help :       Show params structure. <br />
  
  ## Example for parameter
  Run app with input=rc/pci_example.csv, output=rc/export_pci.csv, output log=rc/export_pci_log.csv, mask for credit card = <CREDIT_CARD>:
  > npm run main -- -i "rc/pci_example.csv" -o "rc/export_pci.csv" -l "rc/export_pci_log.csv" --maskcreditcard "<CREDIT_CARD>"
