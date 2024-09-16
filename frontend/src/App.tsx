import React from 'react';
import ImageUpload from './components/ImageUpload';
import ImageEditor from './components/ImageEditor';
import CropperComponent from './components/CropperComponent';
import DownloadButton from './components/DownloadButton';
import { ImageProvider } from './contexts/ImageContext';
import Preview from './components/Preview';
import './App.css';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="App">
        <h1>Image Processing App</h1>
        {/* Step 1: Upload the image */}
        <ImageUpload />
        
        {/* Step 2: Edit the uploaded image (Brightness, Contrast, etc.) */}
        <ImageEditor />
        
        {/* Step 3: Crop the image */}
        <CropperComponent/>
        
        {/* Step 4: Download the processed image */}
        <DownloadButton />
      </div>
    </ImageProvider>
  );
};

export default App;
