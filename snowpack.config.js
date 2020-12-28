/** @type {import("snowpack").SnowpackUserConfig } */

const rollupPlugin = [
  'snowpack-plugin-rollup-bundle',
  {
    //fixme rollup working with preprocessor
    emitHtmlFiles: false,

    // equivalent to inputOptions.input from Rollup
    entrypoints: './src/index.js',

    extendConfig: (config) => {
      // https://rollupjs.org/guide/en/#outputoptions-object
      config.outputOptions = {
        file: './build/dist/index.js',
        format: 'cjs',
        plugins: [
          // need preprocessor ?
        ],
      }

      // https://rollupjs.org/guide/en/#inputoptions-object
      config.inputOptions = {
        input: './src/index.js',
      }

      return config
    },
  },
]

module.exports = {
  //start config obj

  //currently the only way I can get build to make a min/clean dist.
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2018',
    },
  },

  mount: {
    public: '/',
    src: '/src',
  },

  plugins: [
    // rollupPlugin,
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-sass',
  ],

  devOptions: {
    port: 9001,
    open: 'none',
  },

  buildOptions: {
    baseUrl: './',
  },

  install: [
    /* ... */
  ],

  installOptions: {
    /* ... */
  },

  proxy: {
    /* ... */
  },

  alias: {
    /* ... */
  },
}
