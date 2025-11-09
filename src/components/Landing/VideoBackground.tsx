// src/components/Landing/VideoBackground.tsx

import { useState } from "react";

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackGradient?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  fallbackGradient = "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
}) => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <>
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="fixed inset-0 w-full h-full"
          style={{ background: fallbackGradient }}
        />
      )}
      <div className="fixed inset-0 bg-black/65" />
    </>
  );
};
