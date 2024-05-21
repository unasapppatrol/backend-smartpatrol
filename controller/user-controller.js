import User from "../model/User.js";

// Create User
export const createUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      role,
      no_hp,
      domisili,
      nik,
      tempat_lahir,
      tanggal_lahir,
      unit_kerja,
      nama_lengkap,
    } = req.body;

    const newUser = new User({
      username,
      email,
      password,
      role,
      no_hp,
      domisili,
      nik,
      tempat_lahir,
      tanggal_lahir,
      unit_kerja,
      nama_lengkap,
    });

    await newUser.save();
    if (!newUser) {
      res.status(404).json({ message: "Terjadi kesalahan" });
    }
    res.status(201).json({ message: "Success POST method!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "Success GET method", user });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Get users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Data not found or empty!" });
    }
    res.status(200).json({ message: "Success GET method", users });
  } catch (error) {
    res.status(404).json({ message: "Internal server error!" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User telah dihapus" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      role,
      unit_kerja,
      no_hp,
      domisili,
      nik,
      tempat_lahir,
      tanggal_lahir,
      nama_lengkap,
    } = req.body;
    const updatedData = {
      username,
      email,
      password,
      role,
      unit_kerja,
      no_hp,
      domisili,
      nik,
      tempat_lahir,
      nama_lengkap,
      tanggal_lahir,
    };
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }

    return res.status(200).json({ message: "Success UPDATE method", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
