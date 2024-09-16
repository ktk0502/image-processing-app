import React, { useState } from 'react';
import { useImageContext } from '../contexts/ImageContext';

const DownloadButton: React.FC = () => {
  const { preview, brightness, contrast, saturation, rotation, setFinalTransformedImageUrl } = useImageContext();
  const [format, setFormat] = useState<'jpg' | 'png'>('jpg');

  const handleDownload = () => {
    if (preview) {
      const canvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.src = preview;

      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Set canvas dimensions to the image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Apply transformations and filters
          ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);

          // Get the transformed image in the selected format
          const dataUrl = canvas.toDataURL(`image/${format}`);

          // Set the transformed image URL in context
          setFinalTransformedImageUrl(dataUrl);

          // Trigger the download
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `processed-image.${format}`;
          link.click();
        }
      };
    } else {
      console.error('No original image URL available');
    }
  };

  return (
    <div className="download-options">
      <select value={format} onChange={(e) => setFormat(e.target.value as 'jpg' | 'png')} className="format-select">
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
      </select>
      <button onClick={handleDownload} className="download-button">
        Download Image
      </button>
    </div>
  );
};

export default DownloadButton;
