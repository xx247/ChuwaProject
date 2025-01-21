const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    status: { type:String, enum: ['NeverSubmitted','Pending','Approved','Rejected'], default:'NeverSubmitted' },
    feedback: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null }],
});

module.exports = mongoose.model('Application', ApplicationSchema);