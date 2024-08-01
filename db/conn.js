const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sghorai:sghorai_123@education.uywq53e.mongodb.net/pizza?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connection Successfull")
}).catch((e) => {
    console.log(e)
    console.log("no connection")
});