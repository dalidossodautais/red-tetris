const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
  },
};
