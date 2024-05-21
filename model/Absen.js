import mongoose from "mongoose";

const AbsenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nama_lengkap: {
      type: String,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    lokasi_absen: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    image: String,
    checkInTime: {
      type: Date,
      default: null,
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
    total_jam_kerja: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Absen", AbsenSchema);
