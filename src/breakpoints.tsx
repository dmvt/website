export const size = {
  desktop: '2560px',
  desktopL: '3840px',
  desktopM: '1920px',
  desktopS: '1600px',
  laptop: '1024px',
  laptopL: '1440px',
  mobileL: '425px',
  mobileM: '375px',
  mobileS: '320px',
  tablet: '768px'
};

export const device = {
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktopL})`,
  desktopS: `(min-width: ${size.desktopS})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileS: `(min-width: ${size.mobileS})`,
  tablet: `(min-width: ${size.tablet})`
};
