const fs = require('fs');

function scrub(log) {
    const keysToScrub = ['name', 'username', 'password'];
    const emailKeyToScrub = 'email';
    const scrubbedString = '*****';

    return Object.keys(log).reduce((accumulator, currentValue) => {
        if (keysToScrub.includes(currentValue)) {
            accumulator[currentValue] = scrubbedString;
        } else if (currentValue === emailKeyToScrub) {
            accumulator[currentValue] = log[currentValue].split('@').map((e, i) => i === 0 ? scrubbedString : e).join('@');
        }
        else if (Array.isArray(log[currentValue])) {
            accumulator[currentValue] = log[currentValue].map(scrub)
        } else if (typeof log[currentValue] === 'object') {
            accumulator[currentValue] = scrub(log[currentValue]);
        }
        else {
            accumulator[currentValue] = log[currentValue];
        }
        return accumulator;
    }, {})
}

const inFile = process.argv[2] || 'log.json';
const outFile = process.argv[3] || `${inFile.split('.json')[0]}-scrubbed.json`;
const logFile = JSON.parse(fs.readFileSync(inFile, 'utf-8'));
fs.writeFileSync(outFile, JSON.stringify(scrub(logFile), null, 4))




