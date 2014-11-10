var restify = require('restify');


var client = restify.createJsonClient({
	url:'http://localhost:3000',
	version:'*'
});


var cus = {
  cusId: null,
  cusName: '严复',
  cusType: 1,
  sex: '1',
  birthday: new Date(1988,8-1,2),
  papers: [{paperType: '001', paperNo: '444444', startDate: new Date(), endDate: new Date()}],
  contacts: [{contactType: '001', contactValue: '123456789'}],
  addresses: [{addressType: '002', addressValue: '上海', postCode: '201308'}],
  createdDate: null,
  updatedDate: null
};


console.log('add a new customer:');
client.post('/customer', cus, function(err, req, res, obj) {
  if(err){console.log(err);return;}
  var rcus = obj;
  console.log(rcus);

  console.log('query a customer:');
  client.get('/customer/'+rcus.cusId, function(err, req, res, obj){
  	if(err){console.log(err);return;}
  	console.log(obj);

  	var queryJson = {
  		cusName: '严',
	};
	console.log('query a list of customers:');
	client.post('/customer/list', queryJson, function(err, req, res, obj) {
		if(err){console.log(err);return;}
		console.log(obj);
	});

  });

});
