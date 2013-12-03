var request = require('request');
var BASE    = 'https://api.pingdom.com/api/2.0/';


/**
 * @constructor
 * @param {String} username
 * @param {String} password
 * @param {String} key
 */
var Pingdom = module.exports = function(username, password, key) {
  console.log('craete new pingdom');
  this.request = request.defaults({
    auth: { user: username, pass: password },
    headers: {
      'App-Key': key,
    },
  });
};


Pingdom.prototype.get = function(resource, callback) {
  var url = BASE + resource;
  this.request.get(url, function(err, res, data) {
    if (err) return callback(err);
    try {
      data = JSON.parse(data);
      callback(null, data[resource] || data);
    } catch (err) {
      callback(err);
    }
  });
};


Pingdom.prototype.post = function(resource, body, callback) {
  this.request.post({
    url: BASE + resource,
    json: true,
    body: body
  }, function(err, res, data) {
    callback(err, data);
  });
};


Pingdom.prototype.checks = function(callback) {
  this.get('checks', callback);
};
