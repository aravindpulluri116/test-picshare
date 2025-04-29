const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST - Upload photo
router.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// GET - List all uploaded photos
router.get('/', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list files' });
    const fileUrls = files.map(file => `/uploads/${file}`);
    res.json(fileUrls);
  });
});

module.exports = router;
