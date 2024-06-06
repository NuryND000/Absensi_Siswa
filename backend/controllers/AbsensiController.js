import Absensi from "../models/AbsensiModel.js";

export const getAbsensi = async (req, res) => {
    try {
        const absensis = await Absensi.aggregate([
            { $lookup:
              {
                from: "kelas",
                localField: "kelas_id",
                foreignField: "_id",
                as: "kelas"
              }
            },
            { $lookup:
              {
                from: "mapels",
                localField: "mapel_id",
                foreignField: "_id",
                as: "mapel"
              }
              
            }
          ]);
        res.json(absensis);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAbsensiById = async (req, res) => {
    try {
        const absensi = await Absensi.findById(req.params.id);
        res.json(absensi);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getAbsensiByKelasTanggal = async (req, res) => {
    try {
        const date = new Date(req.params.tanggal); // Assuming tanggal is passed as a query parameter
        const month = date.getUTCMonth() + 1; // getUTCMonth() returns month from 0-11, hence +1
        const year = date.getUTCFullYear();

        const absensi = await Absensi.find({
            kelas_id: req.params.id,
            $expr: {
                $and: [
                    { $eq: [{ $month: "$tanggal" }, month] },
                    { $eq: [{ $year: "$tanggal" }, year] }
                ]
            }
        });

        res.json(absensi);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const saveAbsensi = async (req, res) => {
    const absensi = new Absensi(req.body);
    try {
        const insertedabsensi = await absensi.save();
        res.status(281).json(insertedabsensi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateAbsensi = async (req, res) => {
    try {
        const updatedabsensi = await Absensi.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedabsensi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteAbsensi = async (req, res) => {
    try {
        const deletedabsensi = await Absensi.deleteOne({_id:req.params.id});
        res.status(200).json(deletedabsensi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}