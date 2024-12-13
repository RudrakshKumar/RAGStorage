const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

// Set up the upload destination for Multer
const upload = multer({
  dest: 'uploads/', 
  limits: { fileSize: 50 * 1024 * 1024 }, 
});


const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Route to handle file upload with pipe
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // File handling code
    const filePath = path.join(uploadFolder, file.originalname);
    fs.renameSync(file.path, filePath);

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Upload failed', e: error });
  }
});

// Route to delete a file from local storage
router.delete('/delete/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadFolder, filename);

  try {
    
    if (fs.existsSync(filePath)) {
      
      fs.unlinkSync(filePath);
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'File deletion failed',
      e: error
    });
  }
});


module.exports = router;
