const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  storageName: { type: String, required: true },
  fileType: { type: String, required: true },
  size: { type: Number, required: true },
  tags: { type: [String] },
  shareableLink: { type: String },
  viewCount: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
