/* eslint-disable global-require */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./prodMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../config/webpack.dev');
    const addDevMiddlewares = require('./devMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
