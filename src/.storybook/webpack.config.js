const ExtractTextPlugin = require('extract-text-webpack-plugin')
const combineLoaders = require('webpack-combine-loaders')
const webpack = require('webpack')

const cssExtractor = new ExtractTextPlugin('css/main.css', { allChunks: true, ignoreOrder: true })
const loadersArray = [
  {
    loader: 'style-loader' // only in DEV mode
  }, {
    loader: 'css-loader',
    query: {
      modules: false,
      sourceMap: true,
    },
  }, {
    loader: 'autoprefixer-loader',
    query: {
      browsers: 'last 2 versions',
    },
  }, {
    loader: 'sass-loader',
    query: {
      sourceMap: true,
    },
  },
]
const cssLoaders = combineLoaders(loadersArray)
// const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })

module.exports = {
  // devtool: 'source-map', not working
  plugins: [
    cssExtractor,
    // commonChunkPlugin,
  ],
  // entry: {
  //   vendor: ['react', 'react-dom'],
  // },
  module: {
    rules: [
    {
      exclude: modPath => modPath.indexOf('/node_modules/') >= 0,
      test: /\.(jsx|js)$/,
      loader: 'babel-loader',
      query: {
        presets: [['es2015', { modules: false }], 'stage-0', 'react'],
        plugins: ['react-hot-loader/babel', 'transform-decorators-legacy'],
        cacheDirectory: true,
      },
    },
    {
      test: /\.json$/,
      loader: require.resolve('json-loader'),
    }, {
      test: /\.(scss|sass|css)$/,
      loader: false ? cssExtractor.extract('style-loader', cssLoaders) : cssLoaders,
    }, {
      test: /\.(jpe?g|png|gif|svg|webp|woff|woff2|ttf|eot)$/,
      loader: require.resolve('file-loader'),
      query: {
        name: 'assets/[name]-[hash].[ext]',
      },
    }],
  },
}
