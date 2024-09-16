import { useImageContext } from '../contexts/ImageContext';

const useImageProcessing = () => {
  const {
    preview,
    setPreview,
    finalCroppedImageUrl,
    setFinalCroppedImageUrl,
    finalTransformedImageUrl,
    setFinalTransformedImageUrl,
  } = useImageContext();

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    // Request lower-quality preview
    const previewResponse = await fetch('http://localhost:5001/api/preview', {
      method: 'POST',
      body: formData,
    });

    const previewBlob = await previewResponse.blob();
    const previewUrl = URL.createObjectURL(previewBlob);
    setPreview(previewUrl);
  };

  

  const fetchCroppedImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('http://localhost:5001/api/image/crop', {
      method: 'POST',
      body: formData,
    });

    const croppedBlob = await response.blob();
    const croppedImageUrl = URL.createObjectURL(croppedBlob);
    setFinalCroppedImageUrl(croppedImageUrl);
  };

  return {
    preview,
    finalCroppedImageUrl,
    finalTransformedImageUrl,
    handleImageUpload,
    fetchCroppedImage,
  };
};

export default useImageProcessing;
