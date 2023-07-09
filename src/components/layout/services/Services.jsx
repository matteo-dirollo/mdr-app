import { Flex } from '@chakra-ui/react';
import React from 'react';
import ServiceCard from './ServiceCard';
import GraphicDesign from '../lottie/GraphicDesign.json';
import MotionGraphics from '../lottie/MotionGraphics.json';
import WebDesign from '../lottie/WebDesign.json'

const Services = () => {
  return (
    

      <Flex justifyContent="center" flexWrap="wrap">
        <ServiceCard
          title="Graphic Design Solutions"
          description="Providing visually appealing and impactful designs for various purposes, including logos, branding materials, marketing collaterals, and more."
          animationData={GraphicDesign}
        />
        <ServiceCard
          title="Motion Graphics and 3D Animations"
          description="Creating engaging visual content through animated videos, explainer videos, product demos, and visual effects to bring ideas to life."
          animationData={MotionGraphics}
        />
        <ServiceCard
          title="Web Design and UI Development"
          description="Designing and developing custom websites using the latest web technologies, creating visually appealing and user-friendly online experiences."
          animationData={WebDesign}
        />
      </Flex>
    
  );
};

export default Services;
