import React from 'react';
import SensorAnimatedImage from './SensorAnimatedImage';

const Parallax = ({layers}: any) => {
  return (
    <>
      {layers?.reverse()?.map((layer: any, index: any) => (
        <SensorAnimatedImage
          image={layer}
          key={`key-${index}`}
          order={index + 1}
        />
      ))}
    </>
  );
};

export default Parallax;
