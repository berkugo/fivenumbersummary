var fs = require('fs');
var CsvReadableStream = require('csv-reader');
const csv_array = [];
const column_max_min = [];
const inputStream = fs.createReadStream(__dirname + '/Iris.csv', 'utf8');

function fiveNumberSummary() {
    const temp_array = [...csv_array];
    const new_array = temp_array.slice(1);
    const obj = [];
    const temps = [];

    for (let i = 0; i < (new_array[0].length - 1); i++) {

        for (let j = 0; j < new_array.length; j++) {

            temps.push(new_array[j][i]);
        }
        obj.push({
            columnName: csv_array[0][i], min: Math.min.apply(null, temps), max: Math.max.apply(null, temps),
            median: (Math.max.apply(null, temps) + Math.min.apply(null, temps)) / 2,
            q1: (((Math.max.apply(null, temps) + Math.min.apply(null, temps)) / 2) + Math.min.apply(null, temps)) / 2,
            q3: (((Math.max.apply(null, temps) + Math.min.apply(null, temps)) / 2) + Math.max.apply(null, temps)) / 2
        });
        temps.length = 0;

    }
    return obj;


}

inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', (row) => {
        csv_array.push(row);

    })

    .on('end', (row) => {
    });

module.exports.array = csv_array;
module.exports.fiveNS = fiveNumberSummary;