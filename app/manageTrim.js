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
        {
            regexCar: /(\d{16})/g,
            numberOfChar: 16
        },
        {
            regexCar: /(\d{4}[\s-]+\d{4}[\s-]+\d{4}[\s-]+\d{4})/g,
            numberOfChar: 19
        }
    ]

    var values = value.split(new RegExp(',' + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
    if (values.length < 2) {
        return res;
    }
    value = values[1];
    var strResult = value;
    const lineId = values[0];

    var cards = []
    _.times(filter.length, function(i){
        const regex = filter[i].regexCar
        strResult = strResult.replace(regex, maskCredit);
        const numberOfChar = filter[i].numberOfChar
        while ((match = regex.exec(value)) != null) {
            const from = Math.max(1, match.index - 25);
            const to = Math.min(match.index + numberOfChar + 25, value.length - 1);
            var trimDone = {}
            var card = match[0];
            var context = value.substring(from, to)
            context = context.replace(card,maskCredit);
            trimDone[logHdRecordID] = lineId;
            trimDone[logHdType] = "account number";
            trimDone[logHdReplacedBy] = maskCredit;
            trimDone[logHdReplacedStr] = card;
            trimDone[logHdLine] = iLine;
            trimDone[logHdContext] = '"' + context + '"';
            res.trimsDone.push(trimDone);
        }
    });
    res.value = lineId + "," + strResult;
    return res;
}