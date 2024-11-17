const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV;
const isDev = mode === "development";
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ];
    }
    return config;
}

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const entry = () => {
    const entryPoint = "./src/index.ts";
    return {
        pixi: "./node_modules/pixi.js/dist/pixi.js",
        game: entryPoint
    };
};
module.exports = {
    entry: entry(),
    output: {
        filename: filename("js"),
        path: path.resolve("./bin")
    },
    optimization: optimization(),
    devtool: isDev ? "source-map" : "",
    resolve: {
        extensions: [".ts"]
    },
    plugins: [
        new HTMLPlugin({
            template: "./data/index.html",
            filename: "index.html",
            hash: isDev,
            title: "Fantasma Test",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./data/assets"),
                    to: path.resolve(__dirname, "./bin/assets")
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
        new webpack.DefinePlugin({
            __DEV__: isDev
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ["file-loader"]
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: "tsconfig.json",
                            compilerOptions: {
                                outDir: "./bin/"
                            }
                        }
                    }
                ]
            }
        ],
    }
}