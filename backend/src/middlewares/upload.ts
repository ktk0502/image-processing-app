import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the 'public/uploads/' folder exists or create it
const uploadDir = path.join(__dirname, '../public/uploads/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Storing file to:', uploadDir)
    cb(null, uploadDir); // Use absolute path for destination
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log('Saving file as:', file.originalname);
    cb(null, Date.now() + ext); // Append timestamp to filename to avoid conflicts
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only PNG and JPEG files
  const allowedTypes = ['image/png', 'image/jpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG and JPEG are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
