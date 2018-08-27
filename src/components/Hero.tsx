import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import heroIllustration from '@images/hero-illustration.svg';
import { device, size } from '@src/breakpoints';

import Cta from '@components/Cta';

export const CtaContainer = styled.div`
  margin-left: 50px;
  margin-top: 1.5rem;
  width: 40%;

  @media ${device.mobileS} and (max-width: ${size.mobileL}) {
    width: 60%;
    margin-left: 30px;
    margin-right: 30px;
  }

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    margin-left: 50px;
    margin-right: 50px;
    width: 45%;
  }

  @media ${device.tablet} and (max-width: ${size.tabletL}) {
    width: 50%;
  }

  @media ${device.laptop} and (max-width: ${size.laptopM}) {
    width: 60%;
  }
`;

export const HeroArt = styled.div`
  text-align: right;
  margin-top: -20px;

  img {
    width: 70%;
  }

  @media (max-width: ${size.mobileS}) and (max-width: ${size.mobileL}) {
    opacity: 0.4;
    margin-top: -80px;

    img {
      width: 50%;
    }
  }

  @media ${device.mobileS} and (max-width: 767px) {
    margin-top: -80px;
    z-index: -1;
  }
`;

export const HeroText = styled.h1`
  color: #f0f0f0;
  font-size: 50px;
  font-weight: 700;
  line-height: 1.2;

  @media ${device.mobileS} {
    font-size: 22px;
    margin: 50px 30px 0 30px;
  }

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    font-size: 32px;
    margin: 35px 50px 0 50px;
  }

  @media ${device.tablet} {
    font-size: 30px;
    margin: -50px 0 0 50px;
  }

  @media ${device.laptop} {
    font-size: 50px;
  }
`;

class Hero extends React.Component<{ text?: string }, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <section style={{ background: '#181E26', minHeight: '300px' }}>
        <Row type="flex" className="hero" align="middle">
          <Col xs={24} md={12} lg={10} style={{ zIndex: 1 }}>
            <HeroText>
              {this.props.text ||
                'Powering safe, solvent and trustless trading of any asset.'}
            </HeroText>
            <CtaContainer>
              <Cta onlyShowSubscribeButton />
            </CtaContainer>
          </Col>
          <Col xs={0} sm={0} md={12} lg={14}>
            <HeroArt>
              <img
                alt="trade stocks ethereum blockhain derivatives"
                src={heroIllustration}
              />
            </HeroArt>
          </Col>
        </Row>
      </section>
    );
  }
}
export default Hero;
