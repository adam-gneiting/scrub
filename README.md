# SCRUB

To run the scrub.js, make sure node is installed and run `npm run scrub`. This will run the scrub against the default log.json file and output to log-scrubbed.json. 

Optionally, you can specifiy a log file to scrub by supplying a command line argument, `npm run scrub some-log.json`. The output will be written to `some-log-scrubbed.json`. 

To run the scrub function against a JavaScript object, you can comment out the command line args parsing at the bottom of scrub.js and call `scrub(someLogObject)`.