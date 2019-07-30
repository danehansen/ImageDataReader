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
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  output: {
    filename: "danehansen-ImageDataReader.min.js",
    library: ["danehansen", "ImageDataReader"],
    libraryTarget: "umd"
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
