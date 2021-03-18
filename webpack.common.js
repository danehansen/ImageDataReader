const path = require('path');

module.exports = {
  entry: {
    app: "./src/ImageDataReader.js"
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  },
  output: {
    filename: "danehansen-ImageDataReader.min.js",
    library: ["danehansen", "ImageDataReader"],
    libraryTarget: "umd",
    path: __dirname,
  },
  externals: [
    {
      "@danehansen/math": {
        amd: "@danehansen/math",
        commonjs: "@danehansen/math",
        commonjs2: "@danehansen/math",
        root: ["danehansen", "math"]
      }
    }
  ]
};
