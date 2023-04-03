const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true,
        trim: true
    },
    password: { 
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.methods.encryptPassword = async password=>{
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

UserSchema.methods.validPassword = async function(candidatePassword){
    const result = await bcrypt.compare(candidatePassword, this.password)
    return result
}

const User = mongoose.model('User', UserSchema)

module.exports = User;