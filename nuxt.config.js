let rawConfig = require('dotenv-flow').config({ silent: true })

import { trimEmptyKeys } from './lib/config-utils'
import { coreRoutes, generateRoutes } from './router'

const treatedConfig = trimEmptyKeys(rawConfig)

export default {
  //
  // Non-empty environment variables from .env files are written verbatim into the static client.
  //
  // [!] Only expose NON-SENSITIVE values that are needed by the static client app.
  //
  // Additional needed process.env.* values which are not represented in
  // the core `~/.env` file should be added to the `env` key below.
  //
  // Note that we're not utilizing Nuxt `runtimeConfig` features because of the reliance on
  // the Nuxt-specific $config context object, which in turn limits our ability access
  // `process.env.*` values within isomorphic code that might be executing outside a
  // Nuxt module or bundle.
  //
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env
  //      https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#runtimeconfig
  //
  env: {
    ...treatedConfig,
    NODE_ENV: process.env.NODE_ENV,
  },

  // Enable static site generation
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target
  target: 'static',

  // Modules for dev and build (recommended)
  // Doc: https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Nuxt TypeScript support
    '@nuxt/typescript-build',

    // Prismic data access
    '@nuxtjs/prismic',

    // Global SCSS variable + mixin sharing
    '@nuxtjs/style-resources',
  ],

  // Plugins to run before rendering page
  // Doc: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/nuxt-jsonld' }],

  // Tell Nuxt to look in a special folder for page auto-routes.
  // This helps bypass automatic route generation in favor of explicit
  // route definitions, which are setup with `extendRoutes` below.
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-dir
  dir: {
    pages: 'router/noop',
  },

  // Configure default router to pull routes from custom definitions
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
  router: {
    base: treatedConfig.ROUTER_BASE_URL,
    extendRoutes: coreRoutes,
  },

  // Add generated routes so Nuxt knows how to resolve dynamic routes
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  generate: {
    routes: generateRoutes,
    // Create a 404.html page to be discovered by Netlify
    // as a catchall. SPA router will direct users
    // to a styled 404 page appropriately.
    fallback: true,
  },

  // Auto import components
  // Doc: https://go.nuxtjs.dev/config-components
  components: ['~/components', `~/components/global`],

  // Nuxt build configuration
  // Doc: https://go.nuxtjs.dev/config-build
  build: {
    cssSourceMap: false, // fixes breaking dev styles when changed via devtools
    loadingScreen: false,
    // Solve for debugger support by providing proper sourcemaps per context
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },

  // Disable legacy browser support
  // Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern/
  modern: 'client',

  // Global CSS
  // Doc: https://go.nuxtjs.dev/config-css
  css: ['~assets/stylesheets/global.scss'],

  // Style resources module configuration. This entrypoint should
  // not output _any_ CSS, and only define Sass mixins, vars, etc.
  // Doc: https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: ['~assets/stylesheets/resources.scss'],
  },

  // Setup Nuxt prismic module. Optionally includes an accessToken
  // based on whether it is set in environment config.
  // Doc: https://prismic.nuxtjs.org
  prismic: {
    endpoint: treatedConfig.PRISMIC_API,
    disableGenerator: true,
    apiOptions: {
      ...(treatedConfig.PRISMIC_TOKEN
        ? { accessToken: treatedConfig.PRISMIC_TOKEN }
        : {}),
    },
  },
}
