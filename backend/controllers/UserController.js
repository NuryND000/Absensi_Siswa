import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import csv from "csvtojson";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, refresh_token: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0, refresh_token: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveUser = async (req, res) => {
  const { nip, name, email, password, alamat, tmplahir, tgllahir, role } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = password ? await bcrypt.hash(password, salt) : undefined;
    await User.create({
      nip,
      name,
      email,
      password: hashPassword,
      alamat,
      tmplahir,
      tgllahir,
      role,
    });
    res.status(201).json("User created");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: updateData }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const users = await User.find({ nip: req.body.nip });
    if (!users.length) return res.status(404).json({ msg: "NIP not found" });
    const match = await bcrypt.compare(req.body.password, users[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const user = users[0];
    const accessToken = jwt.sign(
      {
        userId: user._id,
        nip: user.nip,
        name: user.name,
        alamat: user.alamat,
        tgllahir: user.tgllahir,
        tmplahir: user.tmplahir,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        nip: user.nip,
        name: user.name,
        alamat: user.alamat,
        tgllahir: user.tgllahir,
        tmplahir: user.tmplahir,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.updateOne({ _id: user._id }, { refresh_token: refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true  // Uncomment if using https
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "NIP not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.find({ refresh_token: refreshToken });
  if (!user.length) return res.sendStatus(204);
  const userId = user[0]._id;
  await User.updateOne({ _id: userId }, { refresh_token: null });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const importUser = async (req, res) => {
  try {
    const csvData = await csv().fromFile(req.file.path);

    const userData = await Promise.all(
      csvData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.Password, await bcrypt.genSalt());
        return {
          nip: user.Nip,
          name: user.Nama,
          alamat: user.Alamat,
          tmplahir: user.Tempat_Lahir,
          tgllahir: user.Tanggal_Lahir,
          password: hashedPassword,
          role: user.Role,
        };
      })
    );

    await User.insertMany(userData);
    res.status(200).json({ msg: "Upload successful" });
  } catch (error) {
    res.status(500).json({ msg: "Upload failed", error: error.message });
  }
};
