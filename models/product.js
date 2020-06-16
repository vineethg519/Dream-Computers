var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaLaptops = new Schema({
    imagePath:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    price: {type: Number, required: true}
});

var schemaEntry = new  Schema({
    rigId:{type:String,required:true},
    processor:{type:String,required:true},
    motherBoard:{type:String,required:true},
    ram:{type:String,required:true},
    hdd:{type:String,required:true},
    graphicCardd:{type:String,required:true},
    psu:{type:String,required:true},
    price:{type:Number,required:true}
});

var schemaGreat = new  Schema({
    rigId:{type:String,required:true},
    processor:{type:String,required:true},
    motherBoard:{type:String,required:true},
    ram:{type:String,required:true},
    hdd:{type:String,required:true},
    graphicCardd:{type:String,required:true},
    psu:{type:String,required:true},
    price:{type:Number,required:true}
});


var schemaGame = new  Schema({
    rigId:{type:String,required:true},
    processor:{type:String,required:true},
    motherBoard:{type:String,required:true},
    ram:{type:String,required:true},
    hdd:{type:String,required:true},
    graphicCardd:{type:String,required:true},
    psu:{type:String,required:true},
    price:{type:Number,required:true}
});

var processorType = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});
var motherB = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});

var ram = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});

var graphics = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});

var psu = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});

var hdd = new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    price:{type:Number,required:true},

});





module.exports = {
    lapi: mongoose.model('laptops',schemaLaptops),
    entryRigs: mongoose.model('entryRigs',schemaEntry),
    greatRigs: mongoose.model('greatRigs',schemaGreat),
    gameRigs: mongoose.model('gameRigs',schemaGame),
    procType: mongoose.model('processorType',processorType),
    motherB: mongoose.model('motherBoard',motherB),
    ram: mongoose.model('ram',ram),
    psu: mongoose.model('psu',psu),
    graphics: mongoose.model('graphicCard',graphics),
    hdd: mongoose.model('hdd',hdd)
};



