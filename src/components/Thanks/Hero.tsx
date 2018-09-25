import React from 'react';
import { Button, Icon, Row } from 'antd';
import styled from 'styled-components';
import heroIllustration from '@images/worldmap.svg';
import { device, size } from '@src/breakpoints';

export const Section = styled.section`
  height: 70vh;
  background: #181e26 url(${heroIllustration}) no-repeat 50% 50%;
  background-size: cover;

  @media ${device.laptopL} {
    height: 80vh;
  }
`;

export const MessageBox = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 50px;
  text-align: center;

  @media ${device.mobileS} {
    width: 100%;
    margin-top: 0;
  }

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.laptop} {
    width: 60%;
  }

  @media ${device.laptopM} {
    margin-top: -120px;
  }

  @media ${device.desktopS} {
    width: 50%;
  }
`;

export const MessageHeader = styled.h1`
  font-weight: 700;

  @media ${device.mobileS} {
    font-size: 22px;
  }

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    font-size: 28px;
  }

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.laptop} {
    font-size: 38px;
  }
`;

export const MessageDescription = styled.p`
  font-weight: 300;

  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.laptop} {
    font-size: 24px;
  }
`;

interface HeroProps {
  tokenThanks?: boolean;
}

class Hero extends React.Component<HeroProps, {}> {
  constructor(props: HeroProps) {
    super(props);
  }

  render() {
    return (
      <Section>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: '100%' }}
        >
          <MessageBox>
            <MessageHeader>
              Thank you for joining the <br /> MARKET Protocol Community
            </MessageHeader>
            <MessageDescription>
              {this.props.tokenThanks
                ? `Thanks for your interest in our token,
                we will be sure to keep you up to date as more information becomes available!`
                : `We will be sure to keep you up to date as more information becomes available!`}
            </MessageDescription>
            <a href="https://marketprotocol.io">
              <Button type="primary" style={{ fontWeight: 600 }}>
                Return to our website
                <Icon style={{ marginLeft: '10px' }} type="arrow-right" />
              </Button>
            </a>
          </MessageBox>
        </Row>
      </Section>
    );
  }
}
export default Hero;
