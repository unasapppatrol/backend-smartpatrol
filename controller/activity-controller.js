import Activity from "../model/Activity.js";
import authorize from "../googleAuth.js";
import uploadFile from "../googleDrive.js";

export const createActivity = async (req, res, next) => {
  try {
    const {
      userId,
      username,
      nama_lengkap,
      instansi_aktivitas,
      pos_aktivitas,
      notes_aktivitas,
    } = req.body;

    // https://drive.google.com/drive/folders/1QDoF6sucpt4Uv20rb2-Uv8FXqkI35WmD?usp=sharing
    const folderId = "1qSbiBUiywiBNeE4Ub29717xrqyH8-fn4";
    const authClient = await authorize();
    const imageArray = [];
    for (const file of req.files) {
      const webViewLink = await uploadFile(authClient, file, folderId);
      imageArray.push(webViewLink);
    }

    const newActivity = new Activity({
      userId,
      username,
      nama_lengkap,
      instansi_aktivitas,
      pos_aktivitas,
      notes_aktivitas,
      image: imageArray,
    });
    await newActivity.save();
    if (!newActivity) {
      return res.json({ message: "terjadi Kesalahan" });
    }
    res.status(201).json({ message: "Aktivitas Berhasil Ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const { nama_instansi } = req.query;
    if (!nama_instansi || nama_instansi === "All") {
      const activities = await Activity.find();
      return res.status(200).json({ message: "Success get", activities });
    }
    const activities = await Activity.find({
      instansi_aktivitas: nama_instansi,
    });
    res.status(200).json({ message: "Success get", activities });
  } catch (error) {
    res.status(500).json({ message: "Terjadi Kesalahan" });
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    await Activity.findById(req.params.id);
    res.status(201).json({ message: "Success get", absen });
  } catch (error) {
    res.status(404).json({ message: "Detail tidak ditemukan" });
    next(error);
  }
};

export const getUserActivity = async (req, res, next) => {
  try {
    const activities = await Activity.find({ userId: req.params.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

export const updateAktivitas = async (req, res) => {
  try {
    const { instansi_aktivitas, pos_aktivitas } = req.body;

    const updatedAktivitas = await Activity.findByIdAndUpdate(
      req.params.id,
      { instansi_aktivitas, pos_aktivitas },
      { new: true }
    );
    if (!updatedAktivitas) {
      return res
        .status(404)
        .json({ message: "Data aktivitas tidak ditemukan" });
    }
    res.status(200).json({ message: "Data aktivitas berhasil di perbarui" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server" });
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Activity has been deleted!" });
  } catch (error) {
    res.status(404).json({ message: "Data not found!" });
  }
};
