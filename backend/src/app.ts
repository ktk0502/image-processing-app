import express from 'express';
import cors from 'cors';
import fileUploadRoutes from './routes/fileUploadRoutes';
import previewRoutes from './routes/previewRoutes';
import cropRoutes from './routes/cropRoutes'
import previewRouter from './routes/previewRoutes'
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/api/image', fileUploadRoutes);
app.use('/api/preview', previewRoutes);
app.use('/api/crop',cropRoutes);
app.use('/api',previewRouter)


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
