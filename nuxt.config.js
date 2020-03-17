import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // mode: 'universal',
  mode: 'spa',
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'notes',
        path: '/notes',
        component: resolve(__dirname, 'components/notes'),
        meta: { requiresAuth: true },
        children: [
          {
            name: 'tasks',
            path: '/tasks/:id',
            component: resolve(__dirname, 'components/notes/tasks/_id.vue')
          }
        ]
      })
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['plugins/protected'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: process.env.F_API_KEY,
      authDomain: process.env.F_AUTH_DOMAIN,
      databaseURL: process.env.F_DATABASE_URL,
      projectId: process.env.F_PROJECT_ID,
      storageBucket: process.env.F_STORAGE_BUCKET,
      messagingSenderId: process.env.F_MESSAGING_SENDER_ID,
      appId: process.env.F_APP_ID,
      measurementId: process.env.F_MEASUREMENT_ID
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        }
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      presets: [
        [
          '@nuxt/babel-preset-app',
          {
            corejs: { version: 3 }
          }
        ]
      ]
    }
  }
}
