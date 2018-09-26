import React from 'react';
import { withSiteData } from 'react-static';
import Hero from '@components/Thanks/Hero';

export const TokenThanksContainer = () => (
  <div>
    <Hero tokenThanks />
  </div>
);

export default withSiteData(TokenThanksContainer);
