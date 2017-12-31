var _ = require('lodash');
exports.trim = trimWithMaskCredit

const logHdLine = "Line";
const logHdRecordID = "Record ID";
const logHdType = "Type";
const logHdReplacedStr = "Replaced string";
const logHdReplacedBy = "Replaced by";
const logHdContext = "Context";
const strResult = "StrResult";
const headers = [logHdLine, logHdRecordID, logHdType, logHdReplacedStr, logHdReplacedBy, logHdContext ];
exports.headers = headers

var maskCredit = "";
var iLine = 0;
function trimWithMaskCredit(string, _mask, _iLine) {
    maskCredit = _mask;
    iLine = _iLine;
    let res = trim(string);
    return res;
}

function trim(string) {
    let res = { value: string, trimsDone: [] };
    res = ruleCreditcard(res);
    return res;
}

function ruleCreditcard(res) {
    var value = res.value
    const filter = [
        {regexCar: /(\d{19})/g,numberOfChar: 19},
        {regexCar: /(\d{18})/g,numberOfChar: 18},
        {regexCar: /(\d{17})/g,numberOfChar: 17},
        {regexCar: /(\d{16})/g,numberOfChar: 16},
        {regexCar: /(\d{15})/g,numberOfChar: 15},
        {regexCar: /(\d{14})/g,numberOfChar: 14},
        {regexCar: /(\d{13})/g,numberOfChar: 13},
        {regexCar: /(\d{12})/g,numberOfChar: 12},
        {regexCar: /(\d{4}[:\s-]+\d{4}[:\s-]+\d{4}[:\s-]+\d{4})/g,numberOfChar: 19},
        {regexCar: /(\d{4}[:\s-]+\d{4}[:\s-]+\d{4}[:\s-]+\d{3})/g,numberOfChar: 18},
        {regexCar: /(\d{8}[:\s-]+\d{8})/g,numberOfChar: 17},
        {regexCar: /(\d{4}[:\s-]+\d{11})/g,numberOfChar: 16},
    ]

    // slipt to get line id and str result from csv line
    var values = value.split(new RegExp(',' + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
    if (values.length < 2) {
        return res;
    }
    var strResult = values[1];
    const lineId = values[0];

    var cards = []
    _.times(filter.length, function(i){
        const regex = filter[i].regexCar
        const numberOfChar = filter[i].numberOfChar
        while ((match = regex.exec(strResult)) != null) {
            const from = Math.max(1, match.index - 25);
            const to = Math.min(match.index + numberOfChar + 25, strResult.length - 1);
            var trimDone = {}
            var card = match[0];
            var context = strResult.substring(from, to)
            context = context.replace(card,maskCredit);
            trimDone[logHdRecordID] = lineId;
            trimDone[logHdType] = "account number";
            trimDone[logHdReplacedBy] = maskCredit;
            trimDone[logHdReplacedStr] = card;
            trimDone[logHdLine] = iLine;
            trimDone[logHdContext] = '"' + context + '"';
            res.trimsDone.push(trimDone);
        }
        strResult = strResult.replace(regex, maskCredit);
    });
    res.value = lineId + "," + strResult;
    return res;
}