import path from "path";
import Absen from "../model/Absen.js";
import authorize from "../googleAuth.js";
import uploadFile from "../googleDrive.js";

// CREATE Absen Masuk
export const absenMasuk = async (req, res, next) => {
  try {
    const {
      userId,
      nama_lengkap,
      username,
      latitude,
      longitude,
      lokasi_absen,
    } = req.body;
    const file = req.file;

    if (!file || !file.mimetype.startsWith("image")) {
      return res.status(400).json({ message: "Only image files are allowed" });
    }

    const folderId = "1E0LyHa483iYmALkOOl_kJp4_gtFMT2Zp";
    const authClient = await authorize();
    const webViewLink = await uploadFile(authClient, file, folderId);

    // Cari status absen terakhir pengguna
    const lastAttendance = await Absen.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (!lastAttendance) {
      // Jika tidak ada catatan absen, lakukan absen masuk
      const newCheckIn = new Absen({
        userId,
        nama_lengkap,
        username,
        latitude,
        longitude,
        lokasi_absen,
        image: webViewLink,
        checkInTime: new Date(),
      });

      await newCheckIn.save();

      return res.status(201).json({
        message: "Success check in",
        checkInTime: newCheckIn.checkInTime,
      });
    }

    if (!lastAttendance.checkOutTime) {
      // Jika belum absen keluar, kembalikan pesan bahwa pengguna harus absen keluar terlebih dahulu
      return res
        .status(400)
        .json({ message: "Anda belum melakukan absen keluar sebelumnya" });
    }

    // Jika sudah absen masuk dan absen keluar sebelumnya, lakukan absen masuk lagi
    const newCheckIn = new Absen({
      userId,
      nama_lengkap,
      username,
      latitude,
      longitude,
      lokasi_absen,
      checkInTime: new Date(),
    });

    await newCheckIn.save();

    return res.status(201).json({
      message: "Success check in",
      checkInTime: newCheckIn.checkInTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// CREATE Absen Keluar
export const absenKeluar = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const lastAttendance = await Absen.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (!lastAttendance) {
      // Jika tidak ada catatan absen, kembalikan pesan bahwa pengguna harus absen masuk terlebih dahulu
      return res
        .status(400)
        .json({ message: "Anda harus melakukan absen masuk terlebih dahulu" });
    }

    if (!lastAttendance.checkOutTime) {
      // Jika belum absen keluar, lakukan absen keluar
      lastAttendance.checkOutTime = new Date();
      const totalMilliseconds =
        lastAttendance.checkOutTime - lastAttendance.checkInTime;
      const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60)); // Total jam kerja dalam jam
      const totalMinutes = Math.floor(
        (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      ); // Total menit kerja yang tersisa

      lastAttendance.total_jam_kerja = `${totalHours} jam ${totalMinutes} menit`;
      await lastAttendance.save();

      return res.status(200).json({
        message: "Success check out",
        checkInTime: lastAttendance.checkInTime,
        checkOutTime: lastAttendance.checkOutTime,
        totalTimeWork: `${totalHours} jam ${totalMinutes} menit`,
      });
    }

    // Jika sudah absen masuk dan absen keluar sebelumnya, kembalikan pesan bahwa pengguna sudah melakukan absen keluar
    return res
      .status(400)
      .json({ message: "Anda sudah melakukan absen keluar hari ini" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// Get All Absen
export const getAllAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find().sort({ createdAt: -1 }); // Sort by createdAt in ascending order
    res.status(201).json({ message: "Success get", absen });
  } catch (error) {
    res.status(404).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get Detail Absen

export const getDetailAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.findById(req.params.id);
    res.status(201).json({ message: "Success get", absen });
  } catch (error) {
    res.status(404).json({ message: "Data no found!" });
    next(error);
  }
};

// Get Absen By Lokasi
export const getLokasiAbsen = async (req, res, next) => {
  try {
    const { lokasi_absen } = req.query;
    if (!lokasi_absen || lokasi_absen === "All") {
      const absen = await Absen.find();
      return res.status(200).json({ message: "Success get", absen });
    }
    const absen = await Absen.find({ lokasi_absen: lokasi_absen });
    res.status(200).json({ message: "Success get", absen });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// Get User Absen
export const getUserAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find({ userId: req.params.id });
    res.status(200).json(absen);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server" });

    next(error);
  }
};

// Update Absen

export const updateAbsen = async (req, res) => {
  try {
    const { lokasi_absen } = req.body;
    const updatedAbsen = await Absen.findByIdAndUpdate(
      req.params.id,
      { lokasi_absen },
      { new: true }
    );
    if (!updatedAbsen) {
      return res.status(404).json({ message: "Data absen tidak ditemukan" });
    }
    res.status(200).json({ message: "Data absen berhasil di perbarui" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server" });
  }
};

// Delete Absen
export const deleteAbsen = async (req, res) => {
  try {
    await Absen.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Data absensi berhasil di hapus" });
  } catch (error) {
    return res.status(404).json({ message: "Internal server error!" });
  }
};
