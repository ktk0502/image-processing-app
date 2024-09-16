import express from 'express';
import upload from '../middlewares/upload';
import { processImage } from '../controllers/imageController';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    res.json({ filePath: req.file.path });
  });
  
  // Endpoint for image processingå
  router.post('/process-image', upload.single('image'), processImage);
  

export default router