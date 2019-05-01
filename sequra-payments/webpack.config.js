const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'sequraPayments',
    libraryTarget: 'umd',
    filename: 'main.js',
    auxiliaryComment: 'UMD library',
    path: path.resolve(__dirname, 'build'),
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    umdNamedDefine: true,
  },
};
