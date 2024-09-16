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
        <ImageUpload />
      
        <ImageEditor />
        
        <CropperComponent/>
        
        <DownloadButton />
      </div>
    </ImageProvider>
  );
};

export default App;
