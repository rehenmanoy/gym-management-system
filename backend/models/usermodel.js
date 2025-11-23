const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required : true,
        unique : true
    },
    gender: {
        type: String,
        enum:['male', 'female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    startDate: {
        type : Date,
        required:true
    },
    plan: {
        type : String,
        enum:['monthly', 'annual', 'pt'],
        required: true
    },
    trainer: {
        type : String,
        default:''
    },
    fitnessGoals: {
        type:String,
        required : true
    },
    paymentStatus: {
        type: String,
        enum :['paid','notPaid'],
        required:true
    }
});

module.exports = mongoose.model('User', userSchema);
