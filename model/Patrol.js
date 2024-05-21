import mongoose from "mongoose";

const patrolSchema = new mongoose.Schema(
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
    nama_lengkap: {
      type: String,
      ref: "User",
    },
    nama_instansi: {
      type: String,
    },
    lokasi_pos: {
      type: String,
    },
    status: {
      type: String,
    },
    notes: {
      type: String,
    },
    image: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patrol", patrolSchema);
