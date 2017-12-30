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
  -i, --input path    Path to input csv file. Default value: rc/pci_example.csv <br />
  -o, --output path   Path to output csv file. Default value: rc/export_pci_example.csv <br />
  -m, --mask string   Mask to replace real card number. Default value: <CREDIT_CARD> <br />
  -h, --help          Show params structure. <br />
  
  ## Example for parameter
  Run app with input=rc/pci_example.csv, output=rc/export_pci.csv, mask for credit card = <CREDIT_CARD>:
  > npm run main -- -i rc/pci_example.csv -o rc/export_pci.csv -m <CREDIT_CARD>
