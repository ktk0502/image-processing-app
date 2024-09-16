import React from 'react';
import { useImageContext } from '../contexts/ImageContext';
import useImageProcessing from '../hooks/useImageProcessing';

const ImageUpload: React.FC = () => {
  const { preview, finalCroppedImageUrl } = useImageContext();
  const { handleImageUpload, fetchCroppedImage } = useImageProcessing();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleCropImage = async () => {
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      await fetchCroppedImage(file); 
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-button">
        <input type="file" onChange={handleUpload} />
        Upload Image
      </label>

      {finalCroppedImageUrl && (
        <div>
          <h4>Cropped Image</h4>
          <img src={finalCroppedImageUrl} alt="Cropped" className="final-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
