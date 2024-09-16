import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useImageContext } from '../contexts/ImageContext';

const CropperComponent: React.FC = () => {
  const { preview, setFinalCroppedImageUrl } = useImageContext();
  const cropperRef = useRef<any>(null);

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();

      if (croppedCanvas) {
        const croppedImageDataUrl = croppedCanvas.toDataURL('image/jpeg');
        setFinalCroppedImageUrl(croppedImageDataUrl);

        const link = document.createElement('a');
        link.href = croppedImageDataUrl;
        link.download = 'cropped-image.jpg';
        link.click();
      } else {
        console.error('Failed to generate cropped canvas');
      }
    }
  };

  return (
    <div className="cropper-container">
      {preview ? (
        <>
          <Cropper
            src={preview}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
          />
          <button onClick={handleCrop} className="crop-button">Crop Image</button>
        </>
      ) : (
        <p>No image selected for cropping</p>
      )}
    </div>
  );
};

export default CropperComponent;
