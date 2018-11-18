const path = require("path");
const public_src = "./public/src/";

module.exports = {
  mode: "production",
  entry: {
    home: public_src + "home.jsx",
    predict: public_src + "predict.jsx",
    generate: public_src + "generate.jsx",
    understand: public_src + "understand.jsx",
    about: public_src + "about.jsx",
    "how-it-works": public_src + "how-it-works.jsx",
    error: public_src + "error.jsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          // creates style nodes from JS strings
          "style-loader",
          // translates CSS into CommonJS
          "css-loader",
          // compiles Sass to CSS, using Node Sass by default
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // this is a hack. webpack is resolving the directory
              // path from /dist. however, when loading the image,
              // it will use whatever path was used in the name shown
              // below. for that reason, we exit out of dist, then
              // enter it anew. that now points to webpack as well
              // to load images from /dist/assets/img_name.ext
              name: "../dist/assets/[hash:16].[ext]",
            }
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};