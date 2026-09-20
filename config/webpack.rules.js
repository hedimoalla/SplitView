module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  // React/JSX support
  {
    test: /\.[jt]sx?$/,
    exclude: /(node_modules|.webpack)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react']
      }
    }
  },
  // CSS with Tailwind via PostCSS
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  }
];
