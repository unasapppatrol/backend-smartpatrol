import User from "../model/User.js";

export const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username dan password diperlukan" });
    }
    const user = await User.findOne({ username: req.body.username });
    const password = await User.findOne({ password: req.body.password });

    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password salah" });
    }

    const { username, _id: userId, role } = user;
    return res
      .status(200)
      .json({ message: "Login berhasil", username, userId, role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi Kesalahan Saat Login" });
  }
};
