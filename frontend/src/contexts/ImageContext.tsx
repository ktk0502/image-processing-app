import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ImageContextProps {
  preview: string | null;
  setPreview: (preview: string | null) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
  saturation: number;
  setSaturation: (saturation: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  finalCroppedImageUrl: string | null;
  setFinalCroppedImageUrl: (url: string | null) => void;
  finalTransformedImageUrl: string | null;
  setFinalTransformedImageUrl: (url: string | null) => void;
}

const ImageContext = createContext<ImageContextProps>({
  preview: null,
  setPreview: () => {},
  brightness: 100,
  setBrightness: () => {},
  contrast: 100,
  setContrast: () => {},
  saturation: 100,
  setSaturation: () => {},
  rotation: 0,
  setRotation: () => {},
  finalCroppedImageUrl: null,
  setFinalCroppedImageUrl: () => {},
  finalTransformedImageUrl: null,
  setFinalTransformedImageUrl: () => {},
});

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [finalCroppedImageUrl, setFinalCroppedImageUrl] = useState<string | null>(null);
  const [finalTransformedImageUrl, setFinalTransformedImageUrl] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{
        preview,
        setPreview,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        saturation,
        setSaturation,
        rotation,
        setRotation,
        finalCroppedImageUrl,
        setFinalCroppedImageUrl,
        finalTransformedImageUrl,
        setFinalTransformedImageUrl,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
