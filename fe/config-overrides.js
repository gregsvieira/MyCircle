// eslint-disable-next-line import/no-extraneous-dependencies
import { ProvidePlugin } from 'webpack';

export default function override(config) {
  // Adicione o polyfill do buffer como um plugin no Webpack
  config.plugins.push(
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  return config;
}
