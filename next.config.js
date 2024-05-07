const path = require('path');
const stylexPlugin = require('@stylexjs/nextjs-plugin');

const nextConfig = {
  images: {
      formats: ['image/webp', 'image/avif'],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: "5000"
        },
      ]
    }
}

module.exports = stylexPlugin({
  aliases: {
    '@/*': [path.join(__dirname, '*')],
  },
  ssg: false,
  rootDir: __dirname,
})(nextConfig);

