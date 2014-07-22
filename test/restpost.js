var http = require('http');

console.log('##########post start############');
var options = {
  host: 'localhost',
  port: 3000,
  path: '/customer',
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
var cus = {
  cusId: null,
  //cusName: '黄义红',
  cusType: 1,
  sex: '1',
  birthday: new Date(1988,8-1,2),
  papers: [{paperType: '001', paperNo: '444444', startDate: new Date(), endDate: new Date()}],
  contacts: [{contactType: '001', contactValue: '123456789'}],
  addresses: [{addressType: '002', addressValue: '上海', postCode: '201308'}],
  createdDate: null,
  updatedDate: null
};
req.write(JSON.stringify(cus));
req.write('\n');
req.end();