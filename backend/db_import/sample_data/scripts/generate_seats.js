// dirty hack
const fs = require('fs');

const input = fs.readFileSync('../theatres.csv', 'utf-8');

let array = input.split(/\n/);
array = array.map(line => Number(line.split(/,/)[1]));

let result = '';
const numRows = 10;
for (let i = 0; i < array.length; i++) {
    let currentRow = 1;
    for (let j = 1; j <= array[i]; j++) {
        result = result.concat(`${i + 1},${j},${currentRow},${getRandomSeatCategory()}\n`);

        if (j % numRows === 0) {
            currentRow++;
        }
    }
}

// remove last line (empty)
let tmp = result.split(/\n/);
result = tmp.slice(0, tmp.length - 1);
result = result.join('\n');

function getRandomSeatCategory() {
    let n = Math.floor(Math.random() * 3);
    switch (n) {
        case 0:
            return 'true,false,false';
        case 1:
            return 'false,true,false';
        case 2:
            return 'false,false,true';
    }
}

fs.writeFileSync('../seats.csv', result);

// theatre_id | number | row | is_normal | is_deluxe | is_removable