import React from 'react';
import { Button, Col, Icon, Modal, Row } from 'antd';
import styled from 'styled-components';
//

import { device, size } from '@src/breakpoints';
import explainerThumbnail from '@images/explainer_thumbnail.png';
import { MarketDescriptionWrapper } from '@src/Styles';

interface ExplainerCtaState {
  explainerPopUpVisible: boolean;
}

interface ExplainerCtaProps {
  enableVideo: boolean;
}

const Wrapper = styled.section`
  padding: 50px;
  background: #f0f0f0;

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    padding: 50px 70px;
  }
`;

const IconStyled = styled(Icon)`
  position: absolute;
  color: rgba(240, 240, 240, 0.7);
  font-size: 45px;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
`;

const ExplainerVideoContainer = styled.div`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  img {
    width: 550px;
  }

  @media ${device.mobileS} and (max-width: ${size.tablet}) {
    img {
      width: 100%;
    }
  }
`;

class ExplainerCta extends React.Component<
  ExplainerCtaProps,
  ExplainerCtaState
> {
  constructor(props: ExplainerCtaProps) {
    super(props);

    this.state = {
      explainerPopUpVisible: this.props.enableVideo
    };
  }

  handleCancel = () => {
    this.setState({
      explainerPopUpVisible: false
    });
  }

  getExplainerModalHeight = () => {
    if (window.innerWidth > 800) {
      return (window.innerWidth - 350) / 1.77 + 'px';
    }
    return window.innerWidth + 'px';
  }

  getExplainerModalWidth = () => {
    if (window.innerWidth > 800) {
      return window.innerWidth - 350;
    }
    return window.innerWidth - 100;
  }

  render() {
    const { explainerPopUpVisible } = this.state;

    return (
      <Wrapper>
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} style={{ textAlign: 'center' }}>
            <ExplainerVideoContainer
              onClick={() => this.setState({ explainerPopUpVisible: true })}
            >
              <img alt="MARKET Protocol " src={explainerThumbnail} />
              <IconStyled type="play-circle" />
            </ExplainerVideoContainer>
            <Modal
              className="explainer-modal"
              width={this.getExplainerModalWidth()}
              visible={explainerPopUpVisible}
              footer={null}
              onCancel={this.handleCancel}
              destroyOnClose={true}
              style={{
                height: this.getExplainerModalHeight(),
                padding: '0'
              }}
              bodyStyle={{
                backgroundColor: 'transparent',
                height: this.getExplainerModalHeight(),
                padding: '0'
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/76h5MXw0uHY?rel=0&showinfo=0&autoplay=1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Modal>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default ExplainerCta;
