import mongoose from "mongoose";


const DetailAbsensi = mongoose.Schema({
    absensi_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'absensi'
    },
    siswa_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Siswa'
    },
    status:{
        type: String,
        require: false
    },
    keterangan:{
        type: String,
        require: false
    }
});

export default mongoose.model('DetailAbsensi', DetailAbsensi);