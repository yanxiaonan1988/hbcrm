var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
	cusId: String,
	cusName: String,
	cusType: Number,
	sex: String,
	birthday: Date,
	papers: [{paperType: String, paperNo: String, startDate: Date, endDate: Date}],
	contacts: [{contactType: String, contactValue: String}],
	addresses: [{addressType: String, addressValue: String, postCode: String}],
	createdDate: Date,
	updatedDate: Date
});

customerSchema.statics.getUniqueCustomer = function(cusJson,callback){
	
	var queryCondition = {cusName: cusJson.cusName,
		cusType: cusJson.cusType,
		papers: {$elemMatch:{paperType: cusJson.paperType, paperNo: cusJson.paperNo}}
	};
	if(cusJson.cusType == 1){
		queryCondition.sex = cusJson.sex;
		queryCondition.birthday = cusJson.birthday;
	}
	console.log('in getUniqueCustomer');
	console.log(queryCondition);
	this.findOne(queryCondition,callback);
};

customerSchema.statics.merge = function(mainCus, newCus){
	//to do
	return mainCus;
}

module.exports = mongoose.model('Customer', customerSchema);