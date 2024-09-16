import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises'; 

export const processImage = async (req: Request, res: Response) => {
  try {
    const { brightness = 100, contrast = 100, rotation = 0, saturation = 100, format = 'jpeg' } = req.body;
    const imagePath = req.file?.path;

    if (!imagePath) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const brightnessValue = parseFloat(brightness) / 100;
    const contrastValue = (parseFloat(contrast)) / 100; 
    const rotationValue = parseInt(rotation, 10);
    const saturationValue = parseFloat(saturation) / 100;

    const validFormats = ['jpeg', 'png'];
    const outputFormat = validFormats.includes(format.toLowerCase()) ? format.toLowerCase() : 'jpeg';

    let image = sharp(imagePath);

    if (brightnessValue !== 1 || saturationValue !== 1) {
      image = image.modulate({ brightness: brightnessValue, saturation: saturationValue });
    }

    if (contrastValue !== 0) {
      image = image.linear(contrastValue);
    }

    if (rotationValue !== 0) {
      image = image.rotate(rotationValue);
    }

    const outputOptions = outputFormat === 'jpeg' ? { quality: 80 } : {};
    const processedImageBuffer = await image.toFormat(outputFormat, outputOptions).toBuffer();

    res.set('Content-Type', `image/${outputFormat}`);
    res.send(processedImageBuffer);

    // await fs.unlink(imagePath);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
