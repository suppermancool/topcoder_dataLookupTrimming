var trimming = require('./fileTrimming');
const manageParam = require('./manageParam');

if (manageParam.help == false || manageParam.help == null || manageParam.help == undefined) {
    trimming.trimming(manageParam.input, manageParam.output, manageParam.mask);
}