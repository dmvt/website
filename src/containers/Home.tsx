import React from 'react';
import { withSiteData } from 'react-static';
import { MarketDescriptionText, MarketDescriptionWrapper } from '@src/Styles';

import Hero from '@components/Hero';
import Solution from '@components/Solution';
import Chain from '@components/Chain';
import Dapp from '@components/Dapp';
import BuildDapp from '@components/BuildDapp';
import Cta from '@components/Cta';
import ExplainerCta from '@components/ExplainerCta';

interface HomeComponentProps {
  subscriptionPopUpVisible?: boolean;
  enableVideo?: boolean;
}

export const HomeComponent = ({
  subscriptionPopUpVisible,
  enableVideo
}: HomeComponentProps) => (
  <div>
    <Hero />
    <ExplainerCta enableVideo={enableVideo} />
    <MarketDescriptionWrapper>
      <MarketDescriptionText>
        <span style={{ color: '#00E2C1', fontWeight: 'bold' }}>
          MARKET Protocol
        </span>{' '}
        has been created to provide a secure, flexible, open source foundation
        for decentralized trading on the Ethereum blockchain. We provide the
        pieces necessary to create a decentralized exchange, including the
        requisite clearing and collateral pool infrastructure, enabling third
        parties to build applications for trading.
      </MarketDescriptionText>
    </MarketDescriptionWrapper>
    <Solution />
    <Chain />
    <Dapp />
    <BuildDapp />
    <Cta subscriptionPopUpVisible={subscriptionPopUpVisible} bg="#f0f0f0" />
  </div>
);

export default withSiteData(HomeComponent);
