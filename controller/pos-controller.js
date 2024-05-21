import Pos from "../model/Pos.js";

export const createPosCollection = async (req, res) => {
  const { nama_instansi, lokasi_barcode } = req.body;

  if (!nama_instansi || !lokasi_barcode) {
    return res
      .status(400)
      .json({ error: "Nama instansi dan lokasi barcode wajib diisi." });
  }

  const newLocation = new Pos({
    nama_instansi,
    lokasi_barcode,
    nama_instansi,
    lokasi_barcode,
  });

  try {
    await newLocation.save();
    res
      .status(201)
      .json({ success: true, message: "Lokasi berhasil ditambahkan." });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan internal server." });
  }
};

export const getsPosCollection = async (req, res) => {
  try {
    const data = await Pos.find();

    res.status(200).json({ message: "Success GET method", pos: data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

export const getPosByInstansi = async (req, res, next) => {
  try {
    const { lokasi_pos } = req.query;
    // console.log(req.query); // Periksa nilai parameter yang diterima oleh server
    if (!lokasi_pos || lokasi_pos === "All") {
      const data = await Pos.find();
      return res.status(200).json({ message: "Success get", pos: data });
    }
    const data = await Pos.find({ nama_instansi: lokasi_pos });
    res.status(200).json({ message: "Success get", pos: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const getPosCollection = async (req, res) => {
  try {
    const data = await Pos.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }
    res.status(200).json({ message: "Berhasil mendapatkan data", data });
  } catch {
    res.status(500).json({ message: "Terjadi kesalahan internal server!" });
  }
};

export const updatePosCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_instansi, lokasi_barcode } = req.body;
    const updatedData = { nama_instansi, lokasi_barcode };
    const dataPos = await Pos.findByIdAndUpdate(id, updatedData, { new: true });
    if (!dataPos) {
      return res.status(404).json({ message: "Ada kesalahan!" });
    }
    return res.status(200).json({ message: "Berhasil diperbarui!" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server!" });
  }
};

export const deletePosCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await Pos.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus pos!" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
