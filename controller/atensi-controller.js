import Atensi from "../model/Atensi.js";

//POST ATENSI
export const createAtensi = async (req, res) => {
  try {
    const {
      userId,
      username,
      judul_atensi,
      tanggal_mulai,
      tanggal_selesai,
      catatan,
    } = req.body;

    if (!userId || !judul_atensi || !tanggal_mulai || !tanggal_selesai) {
      return res.status(400).json({ error: "Semua bidang wajib diisi" });
    }
    const newAbsensi = new Atensi({
      userId,
      username,
      judul_atensi,
      tanggal_mulai,
      tanggal_selesai,
      catatan,
    });

    await newAbsensi.save();

    res.status(201).json({ message: "Atensi berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat atensi" });
  }
};

// GET ALL ATENSI

export const getAllAtensi = async (req, res) => {
  try {
    const data = await Atensi.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal dalam memuat data atensi" });
  }
};

// GET ATENSI ID

export const getAtensiById = async (req, res) => {
  try {
    const data = await Atensi.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal dalam memuat data atensi" });
  }
};

// GET ATENSI BY USER ID

export const getAtensiByUser = async (req, res) => {
  try {
    const data = await Atensi.find({ userId: req.params.id });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal dalam memuat data atensi" });
  }
};

// UPDATE ATENSI
export const updateAtensi = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul_atensi, tanggal_mulai, tanggal_selesai, catatan } = req.body;
    const updateAtensi = {
      judul_atensi,
      tanggal_mulai,
      tanggal_selesai,
      catatan,
    };
    const data = await Atensi.findByIdAndUpdate(id, updateAtensi, {
      new: true,
    });
    res.status(200).json({ message: "Atensi berhasil diperbarui", data });
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui data atensi" });
  }
};

// DELETE ATENSI
export const deleteAtensi = async (req, res) => {
  try {
    await Atensi.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Atensi telah dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data atensi" });
  }
};
