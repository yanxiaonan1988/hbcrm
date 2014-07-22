var http = require('http');

console.log('##########post start############');
var options = {
  host: 'localhost',
  port: 3000,
  path: '/customer/list',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

//req.write('data\n');
var queryJson = {
  cusName: '严晓楠',
  cusType: 1,
  sex: '1',
  birthday: new Date(),
  paperType: '001',
  paperNo: '123456'
};
req.write(JSON.stringify(queryJson));
req.write('\n');
req.end();