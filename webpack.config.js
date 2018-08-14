const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Config = require('./config/config');
const outputDirectory = "dist";

module.exports = {
	entry: "./client/index.js",
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader?limit=100000"
			}
		]
	},
	devServer: {
		port: Config.port,
		open: true
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory]),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		})
	]
};

// proxy: {
// 	"/api": "http://localhost:8080"
// }
