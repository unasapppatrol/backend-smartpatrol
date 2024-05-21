import mongoose from "mongoose";

const Pos = new mongoose.Schema({
  nama_instansi: {
    type: String,
    required: true,
  },
  lokasi_barcode: {
    type: String,
    required: true,
  },
  //   latitude: {
  //     type: Number,
  //     required: true
  // },
  // longitude: {
  //     type: Number,
  //     required: true
  // }
});

export default mongoose.model("Pos", Pos);
