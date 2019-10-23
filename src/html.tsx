/* tslint:disable no-var-requires */
/* tslint:disable no-console */

import * as React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'

const config = require('../gatsby-config.js')

// Load production style
// let styles: string
// if (process.env.NODE_ENV === `production`) {
//   try {
//     styles = require('!raw-loader!../public/styles.css')
//   } catch (err) {
//     console.log(err)
//   }
// }

interface HtmlProps {
  body: any
  postBodyComponents: any
  headComponents: any
}

// Use `module.exports` to be compliante with `webpack-require` import method
export default (props: HtmlProps) => {
  const head = Helmet.rewind()

  // const css =
  //   process.env.NODE_ENV === `production` ? (
  //     <style
  //       id="gatsby-inlined-css"
  //       dangerouslySetInnerHTML={{ __html: styles }}
  //     />
  //   ) : null

  const verification =
    config.siteMetadata && config.siteMetadata.googleVerification ? (
      <meta
        name="google-site-verification"
        content={config.siteMetadata.googleVerification}
      />
    ) : null

  const particles = <script src={withPrefix('/particles.min.js')} />
  const favicon = (
    <link
      href={withPrefix('/favicon.png')}
      type="image/x-icon"
      rel="shortcut icon"
    />
  )

  return (
    <html lang="en">
      <head>
        {props.headComponents}
        <title>SoraYama</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        {favicon}
        {particles}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {verification}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
