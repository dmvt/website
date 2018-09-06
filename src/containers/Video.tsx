import React from 'react';
import { HomeComponent } from '@containers/Home';
import { withSiteData } from 'react-static';

export default withSiteData(() => <HomeComponent enableVideo={true} />);
