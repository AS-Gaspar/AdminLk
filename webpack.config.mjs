import path from 'path';
import { fileURLToPath } from 'url'; // Import 'fileURLToPath'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default { // Changed from module.exports
  mode: "development",
  entry: "./src/frontend/main.jsx",
  output: {
    path: path.resolve(__dirname, "public/js"), // __dirname is now correctly defined
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  watch: true,
};
