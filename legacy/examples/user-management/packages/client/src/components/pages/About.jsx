import React from 'react';
import { Layout } from '../templates/Layout';
import { PrimaryButton } from '@introduction-react/component-library';

export const About = () => {
  return (
    <Layout title="About">
      <p>About Content</p>
      <PrimaryButton to="/">Go home buddy!</PrimaryButton>
    </Layout>
  );
};

export default About;
