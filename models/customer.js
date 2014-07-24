var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
	cusId: String, //customer id
	cusName: String, //customer name
	cusType: Number, //customer type, individual or organization
	sex: String,
	birthday: Date,
	papers: [{paperType: String, paperNo: String, authCntry: String, authOrg: String, startDate: Date, endDate: Date}],
	contacts: [{contactType: String, contactValue: String}],
	addresses: [{addressType: String, addressValue: String, postCode: String}],
	tags: [{tagName: String}],
	moneyLaundering: String, //code
	salesStat: String, //code table
	salesStatDate: Date,
	individualInfo: {
		employer: String,
		maritalStat: String, //code table
		healthyStat: String, //code table
		industry: String, //code table
		eduLvl: String, //code table
		duty: String, //职务描述
		prfssnLvl: String, //职级描述
		techTitile: String, //职称描述
		prof: String, //code table, 职业
		individualStat: String, //code table, 个人状态
		cntryOfBirth: String, //code
		proOfBirth: String, //code
		cityOfBirth: String, //code
		empStat: String, //code
		empStatDate: Date,
		ethnicGroup: String, //code
		preferLang: String, //code
		nationality: String, //code
		secondNat: String, //code
	},
	organizationInfo: {
		contact: String,
		contactPhone: String,
		typeOfOrg: String, //code table
		typeOfBussiness: String, //code table
		regDate: Date,
		legalStruct: String, //code table
		statOrg: String, //code table
		statDate: Date,
		orgStartDate: Date,
		orgEndDate: Date,
		numOfEmp: Number,
		regAddress: String,
		regFund: Number,
		corpRepres: String,
		bizScope: String,
		bizTerm: String
	},
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