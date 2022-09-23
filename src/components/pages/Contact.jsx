import React from 'react';
import ContactForm from '../layout/forms/ContactForm';
import { TabTitle } from '../layout/routing/TabTitle';

const Contact = () => {
  return (
    <>
      <TabTitle title='Contact' />
      <ContactForm />
    </>
  );
};

export default Contact;
