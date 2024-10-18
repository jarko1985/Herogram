const express = require("express");
const router = express.Router();
const {
  uploadFile,
  viewFile,
  getFileStatistics,
  getFiles,
} = require("../controllers/fileController");

router.post("/upload", uploadFile);
router.get("/view/:fileName", viewFile);
router.get("/status/:fileName", getFileStatistics);
router.get("/list", getFiles);

module.exports = router;
