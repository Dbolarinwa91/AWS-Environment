'use client';

import React from 'react';

interface MagicCardProps {
  title: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
}

const MagicCard: React.FC<MagicCardProps> = ({
  title,
  bgGradientFrom,
  bgGradientTo
}) => {
  // Create inline style for custom gradient if provided
  const cardStyle = bgGradientFrom && bgGradientTo ? {
    '--card-from': bgGradientFrom,
    '--card-to': bgGradientTo
  } as React.CSSProperties : {};

  return (
    <div className="magic-card" style={cardStyle}>
      <div className="magic-card-info">
        <p className="title">{title}</p>
      </div>
    </div>
  );
};

export default MagicCard;