#!/usr/bin/env node

var argv = require('argp').createParser({ once: true })
  .readPackage(__dirname + '/../package.json')
  .on('end', function() {
    console.log('must use a command');
    this.printHelp();
  })
  .usages(['pdom <command> [options]'])
  .body()
    .help()
    .option({
      short: 'u',
      long: 'username',
      metavar: 'STR',
      default: process.env.PINGDOM_USERNAME,
    })
    .option({
      short: 'p',
      long: 'password',
      metavar: 'STR',
      default: process.env.PINGDOM_PASSWORD,
    })
    .option({
      short: 'k',
      long: 'key',
      metavar: 'STR',
      default: process.env.PINGDOM_KEY,
    })
  .command('checks')
    .body()
      .help()
      .text('overview of all checks')
  .argv();

var Pingdom = require('..');
var username = argv.username || process.env.PINGDOM_USERNAME;
var password = argv.password || process.env.PINGDOM_PASSWORD;
var key = argv.key || process.env.PINGDOM_KEY;
var client = new Pingdom(username, password, key);

if (argv.checks) {
  client.checks(function(err, checks) {
    if (err) return console.error(err);
    console.log(checks);
  });
}
