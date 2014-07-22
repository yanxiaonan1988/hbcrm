var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');
var Counter = require('../models/counter');

//query customer with exact customerid
router.get('/:customerid', function(req, res) {
	var customer = new Customer();
	var cusId = req.params.customerid;
	Customer.findOne({"cusId":cusId},function(err, customer){
		if(err){
			res.statusCode = 409;
			var mjson = {message:err};
			console.log(mjson);
			res.json(mjson);
		}
		res.json(customer);
	});
});

//query customer list that match given information
//when recognize a unique customer, then return only one
router.post('/list',function(req,res){
	var queryJson = req.body;
	console.log(queryJson);
	var cusName = queryJson.cusName;
	var cusType = queryJson.cusType;
	var sex = queryJson.sex;
	var birthday = queryJson.birthday;
	var paperType = queryJson.paperType;
	var paperNo = queryJson.paperNo;
	
	//attempt to recognize the customer
	if((cusType == 1 && cusName!=null && sex!=null && birthday!=null && paperType!=null && paperNo!=null)
		||(cusType == 2 && cusName!=null && paperType!=null && paperNo!=null)){
		
		Customer.getUniqueCustomer({
			cusName: cusName,
			cusType: cusType,
			sex: sex,
			birthday: birthday,
			paperType: paperType,
			paperNo: paperNo
		},function(err,uCustomer){
			if(err){
				console.log(err)}
			console.log(uCustomer.cusId);
			if(uCustomer != null){
				res.json([uCustomer]);
			}else{
			
				Customer.find(getQueryCondition(queryJson),function(err, customerList){
					if(err){
						res.statusCode = 409;
						var mjson = {message:err};
						console.log(mjson);
						res.json(mjson);
					}
					res.json(customerList);
				});
			}
		});
	}else{
		Customer.find(getQueryCondition(queryJson),function(err, customerList){
			if(err){
				res.statusCode = 409;
				var mjson = {message:err};
				console.log(mjson);
				res.json(mjson);
			}
			res.json(customerList);
		});
	}
	
});

//add new customer
router.post('/', function(req, res) {
	var cusjson = req.body;
	console.log(cusjson);
	var cusName = cusjson.cusName;
	var cusType = cusjson.cusType;
	var sex = cusjson.sex;
	var birthday = cusjson.birthday;
	var paper = cusjson.papers[0];
	var paperType = paper.paperType;
	var paperNo = paper.paperNo;
	
	var queryCondition = {
		cusName: cusName,
		cusType: cusType,
		sex: sex,
		birthday: birthday,
		paperType: paperType,
		paperNo: paperNo
	}
	
	if((cusType == 1 && cusName!=null && sex!=null && birthday!=null && paperType!=null && paperNo!=null)
		||(cusType == 2 && cusName!=null && paperType!=null && paperNo!=null)){
		
		Customer.getUniqueCustomer(queryCondition,function(err,uCustomer){
			if(err){
				res.statusCode = 409;
				var mjson = {message:err};
				console.log(mjson);
				res.json(mjson);
			}
			if(uCustomer != null){
				console.log(uCustomer);
				res.json(uCustomer);
			}else{
				//add as new customer
				Counter.increment('customerSeq', function (err, result) {
					if (err) {
						console.error('Counter on customerSeq save error: ' + err); return;
					}
					console.log('********'+result.next);
			
					var customer = new Customer(cusjson);
					customer.cusId = result.next;
					customer.createdDate = new Date();
					customer.updatedDate = new Date();
					customer.save(function(err){
						if(err){
							res.statusCode = 409;
							var mjson = {message:err};
							console.log(mjson);
							res.json(mjson);
						}
						res.json(customer);
					});
				});
			}
		});
	}else{
		res.statusCode = 409;
		var mjson = {message:"not enough arguments"};
		console.log(mjson);
		res.json(mjson);
	}
	
	
});

router.put('/:customerid', function(req, res) {
	
});


function getQueryCondition(queryJson){
	var cusName = queryJson.cusName;
	var cusType = queryJson.cusType;
	var sex = queryJson.sex;
	var birthday = queryJson.birthday;
	var paperType = queryJson.paperType;
	var paperNo = queryJson.paperNo;
	
	//fuzzy matching of customer
	var queryCondition = {};
	if(cusName != null){
		queryCondition.cusName = new RegExp('^'+cusName);
	}
	if(cusType != null){
		queryCondition.cusType = cusType;
	}
	if(sex != null){
		queryCondition.sex = sex;
	}
	if(birthday != null){
		queryCondition.birthday = birthday;
	}
	
	if(paperType != null && paperNo != null){
		queryCondition.papers = { $elemMatch: {} };
		queryCondition.papers.$elemMatch.paperType = paperType;
		queryCondition.papers.$elemMatch.paperNo = paperNo;
	}
	console.log(queryCondition);
	return queryCondition;
}


module.exports = router;
