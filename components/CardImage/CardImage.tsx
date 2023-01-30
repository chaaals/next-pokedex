import React, { useState, useEffect, FC } from "react";
import Image from "next/image";

interface CardImageProps {
  src: string;
  fallback: string;
  name: string;
  width: number;
  height: number;
}

const CardImage: FC<CardImageProps> = ({
  src,
  fallback,
  name,
  width,
  height,
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={name}
      onError={() => {
        setImgSrc(fallback);
      }}
      width={width}
      height={height}
    />
  );
};

export default CardImage;
