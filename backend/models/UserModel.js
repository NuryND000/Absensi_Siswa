import mongoose from "mongoose";

const User = mongoose.Schema({
    nip:{
        type: String,
        require: false
    },
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    alamat:{
        type: String,
        require: true
    },
    tmplahir:{
        type: String,
        require: true
    },
    tgllahir:{
        type: Date,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    refresh_token:{
        type: String
    }
});

export default mongoose.model('User', User);