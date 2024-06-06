import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.find({refresh_token : refreshToken});
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0]._id;
            const nip = user[0].nip;
            const name = user[0].name;
            const email = user[0].email;
            const alamat = user[0].alamat;
            const tmplahir = user[0].tmplahir;
            const tgllahir = user[0].tgllahir;
            const role = user[0].role;
            const accessToken = jwt.sign({userId, nip, name, email, alamat, tmplahir, tgllahir, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({accessToken});
        })
    } catch (error) {
        console.log(error);
    }
}