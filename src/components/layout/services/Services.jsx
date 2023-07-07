import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <Flex direction="column" align="center" py={10}>
      <Heading as="h2" size="xl" mb={6}>
        Services I Offer
      </Heading>

      <Flex justifyContent="space-between" flexWrap="wrap">
        <ServiceCard
          title="Graphic Design Solutions"
          description="Providing visually appealing and impactful designs for various purposes, including logos, branding materials, marketing collaterals, and more."
        />
        <ServiceCard
          title="Motion Graphics and 3D Animations"
          description="Creating engaging visual content through animated videos, explainer videos, product demos, and visual effects to bring ideas to life."
        />
        <ServiceCard
          title="Web Design and UI Development"
          description="Designing and developing custom websites using the latest web technologies, creating visually appealing and user-friendly online experiences."
        />
      </Flex>
    </Flex>
  );
};

export default Services;
