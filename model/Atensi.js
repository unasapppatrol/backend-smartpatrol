import mongoose from "mongoose";

const AtensiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    judul_atensi: {
      type: String,
    },
    tanggal_mulai: {
      type: Date, // Mengatur tipe data sebagai Date
    },
    tanggal_selesai: {
      type: Date, // Mengatur tipe data sebagai Date
    },
    catatan: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Atensi", AtensiSchema);
