module.exports = {
  //start config obj

  //currently the only way I can get build to make a min/clean dist.
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
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
}
