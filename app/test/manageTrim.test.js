const _ = require('lodash');
const trim = require('../manageTrim');

test('filter credit card', () => {
    function testCredit(card) {
        let line = '"Record ID", "Amex ' + card + ', exp"'
        let expectiveContext = '"Amex <CREDIT-CARD>, exp"'
        var trimLine = trim.trim(line, "<CREDIT-CARD>", 0);
        var trimDone = trimLine.trimsDone[0];
        expect(trimDone["Replaced string"]).toBe(card);
        expect(trimDone["Context"]).toBe(expectiveContext);
    }
    let creditCards = ["3728 0000 0000 000", "3728-0000-0000-000", "3728  0000-0000-000", "3728 0000 0000 000", "3728:0000:0000:000", "5300000000000000", "3727-00000000000", "5491--0000-0000-0000", "46590000 00000000", "4323  0000 0000 0000"];
    _.forEach(creditCards, function(creditCard){
        testCredit(creditCard);
    })
    
})