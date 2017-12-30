const trim = require('./manageTrim');
const fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

exports.trimming = function(inputPath, exportPath, mask) {
    var exportStream = fs.createWriteStream(exportPath, null);
    exportHeader(exportStream, trim.headers);
    var iLine = 0;
    var nReplace = 0;

    console.time("Processing completed in");
    streamInputFile(inputPath, function(line){
        let trimLine = trim.trim(line, mask, iLine);
        iLine += 1;
        let length = trimLine.trimsDone.length;
        nReplace += length;
        for (var i = 0; i < length; i++) {
            var trimDone = trimLine.trimsDone[i];
            exportFile(exportStream, trimDone, trim.headers);
        }
    }, function() {
        // finish
        console.timeEnd("Processing completed in");
        console.log("Number of records processed: " + iLine);
        console.log("Number of replacements done: " + nReplace);
        console.log("Number of bank account replacements done: " + nReplace);
    });
}

function exportHeader(fileStream, headers ){
    var value = "";
    for (var i = 0; i < headers.length; i++) {
        if (i != 0) {
            value += ",";
        }
        value += headers[i];
    }
    exportFileByLine(fileStream, value);
}

function exportFile(fileStream, objectLine, headers ){
    var value = "";
    for (var i = 0; i < headers.length; i++) {
        if (i != 0) {
            value += ",";
        }
        value += objectLine[headers[i]];
    }
    exportFileByLine(fileStream, value);
}

function exportFileByLine(fileStream, line ){
    fileStream.write(line + "\n");
}

function streamInputFile(file, oneLineCB, finish){

    var s = fs.createReadStream(file)
        .pipe(es.split())
        .pipe(es.mapSync(function(line){
            // pause the readstream
            s.pause();
            if (line != "") {
                oneLineCB(line);
            }
            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            finish();
        })
    );
}