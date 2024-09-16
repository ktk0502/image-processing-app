import express from 'express';
import sharp from 'sharp';
import path from 'path';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Ensure this path matches your file storage path

const router = express.Router();

router.post('/preview', upload.single('image'), async (req, res) => {
  try {
    const { brightness = 100, contrast = 100, rotation = 0, saturation = 100 } = req.body;
    const imagePath = req.file?.path;

    if (!imagePath) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    let image = sharp(imagePath)
      .resize({ width: 300 }) 
      .jpeg({ quality: 20 });

    if (brightness !== 100 || saturation !== 100) {
      image = image.modulate({
        brightness: brightness / 100,
        saturation: saturation / 100,
      });
    }

    if (contrast !== 100) {
      image = image.linear(contrast / 100);
    }

    if (rotation !== 0) {
      image = image.rotate(rotation);
    }

    const previewBuffer = await image.toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(previewBuffer);

  } catch (error) {
    console.error('Error generating preview:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;
