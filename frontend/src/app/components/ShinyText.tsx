import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      // 1. We force text-transparent so the background shows through
      // 2. We use bg-clip-text to cut the background to the text shape
      className={`inline-block bg-clip-text text-transparent ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        // Gradient: Zinc-200 (#e4e4e7) -> White (#ffffff) -> Zinc-200 (#e4e4e7)
        backgroundImage: 'linear-gradient(120deg, #e4e4e7 40%, #ffffff 50%, #e4e4e7 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;