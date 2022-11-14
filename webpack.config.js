const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app/index.tsx',
    module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
    },
    resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
}
