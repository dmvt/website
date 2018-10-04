const EnvironmentConstant = {
  ENVIRONMENTS: {
    PRODUCTION: 'production',
    TEST: 'test'
  },
  MAIL_LISTER_API: process.env.MAIL_LISTER_API || 'http://localhost:3210',
  PROD: {
    GOOGLE_TAG_MANAGER: 'GTM-TN3ZVBH',
    URL: 'marketprotocol.io'
  },
  STAGING: {
    GOOGLE_TAG_MANAGER: 'GTM-WDMKD33',
    URL: 'dev.website.marketprotocol.io'
  },
  getNodeEnv: () => process.env.NODE_ENV
};

export default EnvironmentConstant;
