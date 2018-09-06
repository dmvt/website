import React from 'react';
import { Button, Col, Icon, Modal, Row } from 'antd';
import styled from 'styled-components';
import MarketSubscriberForm from './MarketSubscriberForm';
import { MarketHeader } from '@src/Styles';
import { device, size } from '@src/breakpoints';
import EmailConstant from '@constants/email';

interface Props {
  bg?: string;
  beforeIcon?: string;
  text?: string;
  afterIcon?: boolean;
  onlyShowSubscribeButton?: boolean;
  showExplainerAndNewsLetter?: boolean;
  subscriptionPopUpVisible?: boolean;
}

interface CtaState {
  subscriptionPopUpVisible: boolean;
  explainerPopUpVisible: boolean;
}

export const SectionWrapper = styled.section`
  background: #f0f0f0;
  padding: 70px 70px;

  @media ${device.mobileS} and (max-width: ${size.tablet}) {
    padding: 70px 30px 0px 30px;
  }
`;

const ButtonContainer = styled(Col)`
  width: 90%;
  margin: 0 auto;

  @media ${device.mobileS} and (max-width: ${size.tablet}) {
    width: 90%;
    padding: 0px;
    margin-bottom: 70px;
  }
`;

export const emailLink = `mailto:${
  EmailConstant.PARTNERS_EMAIL.email
}?subject=${EmailConstant.PARTNERS_EMAIL.subject}&body=${
  EmailConstant.PARTNERS_EMAIL.body
}`;

class Cta extends React.Component<Props, CtaState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      explainerPopUpVisible: false,
      subscriptionPopUpVisible: !!this.props.subscriptionPopUpVisible
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
    const { subscriptionPopUpVisible, explainerPopUpVisible } = this.state;
    const {
      bg,
      beforeIcon = '',
      onlyShowSubscribeButton,
      showExplainerAndNewsLetter,
      text,
      afterIcon = true
    } = this.props;

    if (onlyShowSubscribeButton) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Button
            onClick={() => this.setState({ subscriptionPopUpVisible: true })}
            type="primary"
            id="subscribe-button"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: afterIcon ? 'space-between' : 'center',
              padding: afterIcon || beforeIcon ? '' : '0 4rem',
              width: afterIcon || beforeIcon ? '100%' : ''
            }}
          >
            {!!beforeIcon && (
              <img
                alt="join mailing list"
                src={beforeIcon}
                style={{ marginRight: '10px', width: '19px' }}
              />
            )}
            {text || `Join our Newsletter${' '}`}
            {afterIcon && (
              <Icon
                type="arrow-right"
                style={{ position: 'absolute', top: '35%', right: '15px' }}
              />
            )}
          </Button>

          <MarketSubscriberForm
            onCancel={() => this.setState({ subscriptionPopUpVisible: false })}
            visible={subscriptionPopUpVisible}
          />
        </div>
      );
    }

    if (showExplainerAndNewsLetter) {
      return (
        <div>
          <Button
            onClick={() => this.setState({ explainerPopUpVisible: true })}
            type="primary"
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: '20px',
              textAlign: 'left',
              width: '180px'
            }}
          >
            Watch Video
            <Icon type="play-circle" />
          </Button>
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
          <a
            onClick={() => this.setState({ subscriptionPopUpVisible: true })}
            id="subscribe-button"
            style={{
              alignItems: 'center',
              display: 'flex',
              marginLeft: '5px',
              marginTop: '20px',
              textAlign: 'left'
            }}
          >
            {text || `Join our Newsletter${' '}`}
            <Icon style={{ marginLeft: '10px' }} type="arrow-right" />
          </a>

          <MarketSubscriberForm
            onCancel={() => this.setState({ subscriptionPopUpVisible: false })}
            visible={subscriptionPopUpVisible}
          />
        </div>
      );
    }

    return (
      <SectionWrapper
        id="subscribe"
        style={{
          background: bg
        }}
      >
        <MarketSubscriberForm
          onCancel={() => this.setState({ subscriptionPopUpVisible: false })}
          visible={subscriptionPopUpVisible}
        />
        <Row type="flex" justify="center">
          <Col xs={24} md={12} lg={9} xl={6}>
            <ButtonContainer>
              <MarketHeader
                align="center"
                style={{ fontSize: '24px', marginBottom: '30px' }}
              >
                Join our Newsletter
              </MarketHeader>
              <Button
                onClick={() =>
                  this.setState({ subscriptionPopUpVisible: true })
                }
                id="subscribe-button"
                type="primary"
                style={{ width: '100%', textAlign: 'left' }}
              >
                Click To Subscribe{' '}
                <Icon
                  type="arrow-right"
                  style={{ position: 'absolute', top: '35%', right: '15px' }}
                />
              </Button>
            </ButtonContainer>
          </Col>
          <Col xs={24} md={12} lg={9} xl={6}>
            <ButtonContainer>
              <MarketHeader
                align="center"
                style={{ fontSize: '24px', marginBottom: '30px' }}
              >
                Become a Partner
              </MarketHeader>
              <Button
                href={emailLink}
                id="email-button"
                type="primary"
                style={{ width: '100%', textAlign: 'left' }}
              >
                Email Us{' '}
                <Icon
                  type="arrow-right"
                  style={{ position: 'absolute', top: '35%', right: '15px' }}
                />
              </Button>
            </ButtonContainer>
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
}
export default Cta;
