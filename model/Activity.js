import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    nama_lengkap: {
      type: String,
      ref: "User",
    },
    instansi_aktivitas: {
      type: String,
    },
    pos_aktivitas: {
      type: String,
    },
    notes_aktivitas: {
      type: String,
    },
    image: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Activity", ActivitySchema);
