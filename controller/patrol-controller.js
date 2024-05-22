import Patrol from "../model/Patrol.js";
import authorize from "../googleAuth.js";
import uploadFile from "../googleDrive.js";
import {
  sendNotification,
  createNotificationMessage,
  saveToken,
  getAllTokens,
} from "../service/Notification.js";
const iconApp =
  "https://bsdm.unas.ac.id/wp-content/uploads/2022/01/Logo-UNAS-Universitas-Nasional-Original-PNG-1.png";

// Create
export const createPatrol = async (req, res, next) => {
  try {
    const {
      userId,
      username,
      lokasi_pos,
      status,
      notes,
      nama_instansi,
      nama_lengkap,
    } = req.body;

    // Folder Google Drive untuk menyimpan image
    const folderId = "1YCISR1e4o164FUV59Uulorp-UlK_Jw5N";

    // Mengautentikasi dan mendapatkan klien JWT
    const authClient = await authorize();
    // Menampung image ke array
    const imageArray = [];

    // Mengunggah file ke Google Drive dan mendapatkan URL tampilan web
    for (const file of req.files) {
      const webViewLink = await uploadFile(authClient, file, folderId);
      imageArray.push(webViewLink);
    }

    const newPatrol = new Patrol({
      userId,
      username,
      lokasi_pos,
      status,
      notes,
      nama_instansi,
      nama_lengkap,
      image: imageArray,
    });
    await newPatrol.save();

    const expoPushToken = getAllTokens();

    const messages = createNotificationMessage(
      expoPushToken,
      "Patroli Baru Ditetapkan!",
      `${nama_lengkap} telah membuat patroli baru di ${lokasi_pos}. Klik untuk melihat detailnya.`,
      iconApp
    );
    await sendNotification(messages);

    res.status(201).json({ message: "Success created patrols" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get all
export const getAllPatrol = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const patrols = await Patrol.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });
    res.status(201).json(patrols);
  } catch (error) {
    res.status(404).json({ mesaage: "Data not found!" });
    next(error);
  }
};

// Get Patrol by Instansi
export const getPatrolByInstansi = async (req, res, next) => {
  try {
    const { nama_instansi } = req.query;
    if (!nama_instansi || nama_instansi === "All") {
      const patrols = await Patrol.find();
      return res.status(200).json({ message: "Success get", patrols });
    }
    const patrols = await Patrol.find({ nama_instansi: nama_instansi });
    res.status(200).json({ message: "Success get", patrols });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// Get detail
export const getDetailPatrol = async (req, res, next) => {
  try {
    const findPatrolSpesific = await Patrol.findById(req.params.id);
    res.status(201).json({ message: "Success get", findPatrolSpesific });
  } catch (error) {
    res.status(404).json({ message: "Data not found!" });
    next(error);
  }
};

export const getUserPatrol = async (req, res, next) => {
  try {
    const patrol = await Patrol.find({ userId: req.params.id });
    res.status(200).json(patrol);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server" });

    next(error);
  }
};

// Update

export const updatePatrol = async (req, res) => {
  try {
    const { lokasi_pos, nama_instansi, status } = req.body;
    const updatedPatrol = await Patrol.findByIdAndUpdate(
      req.params.id,
      {
        lokasi_pos,
        nama_instansi,
        status,
      },
      { new: true }
    );
    if (!updatedPatrol) {
      return res.status(404).json({ message: "Data patroli tidak ditemukan" });
    }
    res.status(200).json({ message: "Data patroli berhasil di perbarui" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Delete
export const deletePatrol = async (req, res, next) => {
  try {
    await Patrol.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Data has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Store token notification

export const savePushToken = (req, res) => {
  const { token } = req.body;
  try {
    saveToken(token);
    res.send("Token saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
