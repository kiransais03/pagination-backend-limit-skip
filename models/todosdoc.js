const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosdoc = new Schema({
    userId : {
        type:Number,
        require:true,
    },
    id : {
        type:Number,
        require:true,
    },
    title : {
        type:String,
        require:true,
    },
    completed : {
        type:Boolean,
        require:true,
    },
},{collection:"todos"})


module.exports = mongoose.model('todos',todosdoc);
