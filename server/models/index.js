const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twitter",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    keepAlive: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");