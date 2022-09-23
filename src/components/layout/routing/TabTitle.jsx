import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TabTitle = ({ title }) => {
    return (
      <Helmet prioritizeSeoTags> 
        <title>MDR - {title}</title>
      </Helmet>
    );
  };