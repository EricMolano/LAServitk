const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
      };

      config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ]);

      return config;
    },
  },
};
