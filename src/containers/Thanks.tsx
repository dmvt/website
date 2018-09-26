import React from 'react';
import { withSiteData } from 'react-static';
import Hero from '@components/Thanks/Hero';

export const ThanksContainer = () => (
  <div>
    <Hero tokenThanks={false} />
  </div>
);

export default withSiteData(ThanksContainer);
