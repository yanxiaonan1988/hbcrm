var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeStringSchema = new Schema({
	code: String,
	codeType: String,
	codeTypeDesc: String,
	codeDesc: String
});


module.exports = mongoose.model('CodeString', codeStringSchema);