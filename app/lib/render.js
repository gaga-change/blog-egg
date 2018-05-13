
/**
 * Module dependencies.
 */

const views = require('koa-views');
const path = require('path');

// setup views mapping .html
// to the swig template engine

module.exports = views(path.resolve(__dirname, '../../views'), {
  map: { html: 'swig' }
})
