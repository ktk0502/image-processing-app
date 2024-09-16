import React from 'react';
import { useImageContext } from '../contexts/ImageContext';

const Preview: React.FC = () => {
  const { preview, finalTransformedImageUrl } = useImageContext();

  return (
    <div className="preview-container">
      {preview ? (
        <img src={finalTransformedImageUrl || preview} alt="Preview" className="preview-image" />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

export default Preview;
