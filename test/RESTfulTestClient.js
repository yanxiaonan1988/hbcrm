var http = require('http');

console.log('##########get start############');
var options = {
  host: 'localhost',
  port: 3000,
  path: '/customer/3',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

// write data to request body
//req.write('data\n');
//req.write('data\n');
req.end();
