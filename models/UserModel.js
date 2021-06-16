const bcrypt = require('bcrypt')
const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const userSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    username:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})

// userSchema.statics.findAndValidate = async function (username, password) {
//     const foundUser = await this.findOne({ username });
//     const isValid = await bcrypt.compare(password, foundUser.password);
//     return isValid ? foundUser : false;
// };

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = UserModel = Model('User',userSchema)
