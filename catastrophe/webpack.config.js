const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
  fallback: {
    assert: false,
    buffer: false,
    console: false,
    constants: false,
    crypto: false,
    domain: false,
    events: false,
    http: false,
    https: false,
    os: false,
    path: false,
    punycode: false,
    process: false,
    querystring: false,
    stream: false,
    string_decoder: false,
    sys: false,
    timers: false,
    tty: false,
    url: false,
    util: false,
    vm: false,
    zlib: false,
    net: false,
    tls: false,
    fs: false
  }
  }
};
