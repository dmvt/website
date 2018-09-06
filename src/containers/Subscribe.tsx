import React from 'react';
import { withSiteData } from 'react-static';
import { HomeComponent } from '@containers/Home';

export default withSiteData(() => <HomeComponent subscriptionPopUpVisible />);
