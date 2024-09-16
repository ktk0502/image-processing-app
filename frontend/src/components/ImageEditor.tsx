import React, { useState } from 'react';
import { useImageContext } from '../contexts/ImageContext';
import useImageProcessing from '../hooks/useImageProcessing';

const ImageEditor: React.FC = () => {
  const { preview, finalTransformedImageUrl, setFinalTransformedImageUrl } = useImageContext();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);

  const applyFilters = () => ({
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transform: `rotate(${rotation}deg)`,
  });

  const applyFinalFilters = async () => {
    if (preview) {
      try {
        const processedImageUrl : any  = await processImage(preview, {
          brightness,
          contrast,
          saturation,
          rotation,
        });
  
        setFinalTransformedImageUrl(processedImageUrl);
      } catch (error) {
        console.error('Error applying filters:', error);
      }
    }
  };
  

  return (
    <div className="image-editor-container">
      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            style={applyFilters()} 
            className="image-preview"
          />
          <div className="controls">
            <div className="control">
              <label htmlFor="brightness">Brightness</label>
              <input
                id="brightness"
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="slider"
                aria-label="Brightness"
              />
              <span>{brightness}%</span>
            </div>
            <div className="control">
              <label htmlFor="contrast">Contrast</label>
              <input
                id="contrast"
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="slider"
                aria-label="Contrast"
              />
              <span>{contrast}%</span>
            </div>
            <div className="control">
              <label htmlFor="saturation">Saturation</label>
              <input
                id="saturation"
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="slider"
                aria-label="Saturation"
              />
              <span>{saturation}%</span>
            </div>
            <div className="control">
              <label htmlFor="rotation">Rotation</label>
              <input
                id="rotation"
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="slider"
                aria-label="Rotation"
              />
              <span>{rotation}°</span>
            </div>
          </div>
          <button onClick={applyFinalFilters} className="apply-filters-btn">
            Apply Filters
          </button>
        </>
      ) : (
        <p>No image selected.</p>
      )}
    </div>
  );
};

export default ImageEditor;
function processImage(preview: string, arg1: { brightness: number; contrast: number; saturation: number; rotation: number; }) {
  throw new Error('Function not implemented.');
}

