require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_CON_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Successfully Connected.")
})
.catch(e=>{
    console.log(e)
});