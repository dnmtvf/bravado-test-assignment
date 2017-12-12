const { environment } = require('@rails/webpacker');

environment.loaders.set('sss', {
  test: /\.sss/,
  loader: 'style-loader!css-loader!postcss-loader?parser=sugarss',
});

module.exports = environment;
