exports.trim = trimWithMask

const hdLine = "Line";
const hdRecordID = "Record ID";
const hdType = "Type";
const hdReplacedStr = "Replaced string";
const hdReplacedBy = "Replaced by";
const hdContext = "Context";
const headers = [hdLine, hdRecordID, hdType, hdReplacedStr, hdReplacedBy, hdContext ];
exports.headers = headers

var mask = "";
var iLine = 0;
function trimWithMask(string, _mask, _iLine) {
    mask = _mask;
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
    const lineId = values[0];

    var cards = []
    for (var i = 0; i < filter.length; i++) {
        const regex = filter[i].regexCar
        const numberOfChar = filter[i].numberOfChar
        while ((match = regex.exec(value)) != null) {
            const from = Math.max(1, match.index - 25);
            const to = Math.min(match.index + numberOfChar + 25, value.length - 1);
            var trimDone = {}
            var card = match[0];
            var context = value.substring(from, to)
            context = context.replace(card,mask);
            trimDone[hdRecordID] = lineId;
            trimDone[hdType] = "account number";
            trimDone[hdReplacedBy] = mask;
            trimDone[hdReplacedStr] = card;
            trimDone[hdLine] = iLine;
            trimDone[hdContext] = '"' + context + '"';
            res.trimsDone.push(trimDone);
        }
    }
    return res;
}