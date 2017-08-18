var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('stylesheets/[name]-one.css');

/*
const VENDOR_LIBS = [
  'lodash', 'react', 'redux', 'react-redux', 'react-dom',
  'faker', 'react-input-range', 'redux-form', 'redux-thunk'
]*/

module.exports = {
  entry: {
    app: './src/index.js',
    //vendor: VENDOR_LIBS
    //,style: './src/styles/sass/app.sass'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //filename: 'bundle.js'
    filename: '[name].[chunkhash].js' // substitui o nome do entry aqui (bundle e vendor)
    //filename: '[name].[chunkhash].[extension]'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.sass$/i,
        //use: extractSASS.extract([ 'css-loader', 'sass-loader' ])
        use: ExtractTextPlugin.extract({
          use: [
                {
                  loader: "style-loader"
                }, 
                {
                  loader: "css-loader"
                }, 
                {
                  loader: "sass-loader",
                  options: {
                    includePaths: ["./styles/sass/app.sass"]
                  }
                }
              ],
          // use style-loader in development
          //fallback: "style-loader"
        })
      },
      /*{
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          //loader: ['style-loader', 'css-loader', 'sass-loader']
          use: ['css-loader', 'sass-loader']
        })
      },*/
      /*{
        test: [/\.scss$/i, /\.css$/],
        loader: extractCSS.extract('style-loader', 'css?-minimize!postcss!sass'),
      },*/

      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    /*new ExtractTextPlugin({ // define where to save the file
        filename: '[name].css',
        allChunks: true
    }),*/
    //extractSass,
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','manifest']
    }),
    new HtmlWebpackPlugin({ // para inserir js files only ?
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
