const multer = require("multer");
const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const fs = require("fs");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Use a unique name for each file
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|mp4/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"));
  }
};

// Initialize Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50MB
});

exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Save file metadata in MongoDB
      const newFile = new File({
        originalName: file.originalname,
        storageName: file.filename,
        fileType: file.mimetype,
        size: file.size,
        tags: tags ? tags.split(",") : [],
        shareableLink: `${req.protocol}://${req.get("host")}/file/view/${
          file.filename
        }`,
      });

      await newFile.save();
      res
        .status(201)
        .json({ message: "File uploaded successfully", file: newFile });
    } catch (err) {
      res.status(500).json({ message: "Error saving file metadata" });
    }
  });
};

// File view (download or stream)
exports.viewFile = async (req, res) => {
  const { fileName } = req.params;

  try {
    const file = await File.findOne({ storageName: fileName });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Increment view count
    file.viewCount += 1;
    await file.save();

    const filePath = path.join(__dirname, "../uploads", fileName);
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving file" });
  }
};

// Statistics tracking
exports.getFileStatistics = async (req, res) => {
  try {
    const file = await File.findOne({ storageName: req.params.fileName });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({
      originalName: file.originalName,
      viewCount: file.viewCount,
      tags: file.tags,
      uploadDate: file.uploadDate,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching file statistics" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
};
