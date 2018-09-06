import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'

/*
* For Less Support
* */
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'

/*
* For TypeScript Support
* */
const typescriptWebpackPaths = require('./webpack.config.js')

const path = require('path')
const fs = require('fs')

const lessToJs = require('less-vars-to-js')

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'src/theme-ant-overwrite.less'), 'utf8')
)

const webpack = require('webpack')

export default {
  getSiteData: () => ({
    title: 'MARKET Protocol',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/video',
        component: 'src/containers/Video',
      },
      {
        path: '/team',
        component: 'src/containers/Team',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/partners',
        component: 'src/containers/Partners',
      },
      {
        path: '/whitepaper',
        component: 'src/containers/WhitePaper',
      },
      {
        path: '/jobs',
        component: 'src/containers/Jobs',
      },
      {
        path: '/token-interest',
        component: 'src/containers/TokenInterest',
      },
      {
        path: '/subscribe',
        component: 'src/containers/Subscribe',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    const helmet = Helmet.renderStatic()
    meta.helmet = helmet
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Body, children, Html, Head, renderMeta, routeInfo } = this.props
      const ogUrl = `https://marketprotocol.io/${routeInfo && routeInfo.path ? routeInfo.path : ''}`
      const post = routeInfo && routeInfo.allProps ? routeInfo.allProps.post : undefined
      const metaTitle = post && post.data && post.data.title ? post.data.title : 'MARKET Protocol'
      const metaImage = post && post.data && post.data.thumbnail ? post.data.thumbnail : 'https://marketprotocol.io/social.jpg'

      return (
        <Html itemScope itemType="http://schema.org/Article">
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="/favicon.png" />
            <link
              href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"
              rel="stylesheet"
            />

            {renderMeta.styleTags}
            {renderMeta.helmet && renderMeta.helmet.title.toComponent()}
            {renderMeta.helmet && renderMeta.helmet.meta.toComponent()}

            <meta httpEquiv="content-language" content="en" />
            <meta itemProp="name" content={metaTitle} />
            <meta
              itemProp="description"
              content="Powering safe, solvent and trustless trading of any asset."
            />
            <meta itemProp="image" content={metaImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MarketProtocol" />
            <meta name="twitter:creator" content="@MarketProtocol" />
            <meta name="twitter:image:src" content={metaImage} />
            <meta property="og:locale" content="en_US" />
            <meta name="language" content="English" />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta
              property="og:description"
              content="Powering safe, solvent and trustless trading of any asset."
            />
            <meta property="og:image" content={metaImage} />
            <meta name="robots" content="index,follow" />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
  webpack: (config, { stage, defaultLoaders }) => {
    /*
    * TypeScript Support
    * */

    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // Needed for momoent js resolution in React 16
    // See: https://github.com/moment/moment/issues/2979#issuecomment-332217206
    config.resolve.alias.moment$ = 'moment/moment.js'

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    const jsTsLoader = {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    }

    /*
    * Less Support
    * */

    // Add .less & .css to resolver
    config.resolve.extensions.push('.less')
    config.resolve.extensions.push('.css')

    // Loader depending on stage. Same format as the default cssLoader.
    let lessLoader = {}

    if (stage === 'dev') {
      // Enable Hot Module Replacement
      config.plugins.push(new webpack.HotModuleReplacementPlugin())

      // In-Line with style-loader
      lessLoader = {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      }
    } else {
      // Extract to style.css
      lessLoader = {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: false,
              sourceMap: false,
            },
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  postcssFlexbugsFixes,
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
                modifyVars: themeVariables,
                javascriptEnabled: true,
              },
            },
          ],
        }),
      }
    }

    /*
    * Add new Loaders to default Loaders
    * */
    config.module.rules = [
      {
        oneOf: [jsTsLoader, lessLoader, defaultLoaders.cssLoader, defaultLoaders.fileLoader],
      },
    ]

    // Update ExtractTextPlugin with current instance
    config.plugins[2] = new ExtractTextPlugin({
      filename: getPath => {
        process.env.extractedCSSpath = 'styles.css'
        return getPath('styles.css')
      },
      allChunks: true,
    })

    return config
  },
}
