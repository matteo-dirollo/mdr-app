import React from 'react';
import Lottie from 'react-lottie';

const LottieIcon = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default LottieIcon;
