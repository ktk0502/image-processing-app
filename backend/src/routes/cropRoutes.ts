import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.post('/crop', async (req, res) => {
  try {
    const imagePath = req.file?.path;
    const { x, y, width, height } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const croppedImageBuffer = await sharp(imagePath)
      .extract({
        left: parseInt(x, 10),
        top: parseInt(y, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
      })
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(croppedImageBuffer);

    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });
  } catch (error) {
    console.error('Error cropping image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
