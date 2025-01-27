const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    status: {type:String, enum: ['NeverSubmitted','Pending','Approved','Rejected'], default:'NeverSubmitted'},
    feedback:{type: String},
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
});

module.exports = mongoose.model('Application', ApplicationSchema);