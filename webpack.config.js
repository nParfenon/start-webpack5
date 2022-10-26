const path = require('path');
const mode = process.env.NODE_ENV || 'development';

const isDevelopment = mode === 'development';
const target = isDevelopment ? 'web' : 'browserslist';
const devtool = isDevelopment ? 'source-map' : undefined;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PostcssPresetEnv = require("postcss-preset-env");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const PATHS = {
    entry: {
        main: 'src',
        style: 'style',
        js: 'js',
        img: 'img',
        fonts: 'fonts'
    },
    output: {
        main: 'build',
        img: 'img',
        fonts: 'fonts'
    }
};

module.exports = {
    mode: mode,
    target: target,
    devtool: devtool,
    entry: [
        '@babel/polyfill',
        'normalize.css/normalize.css',
        path.resolve(__dirname, PATHS.entry.main, 'index.js')
    ],
    output: {
        path: path.resolve(__dirname, PATHS.output.main),
        filename: 'bundle[contenthash].js',
        clean: true,
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, PATHS.entry.main, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle[contenthash].css'
        }),
        new ImageminWebpWebpackPlugin([
            {
                config: [{
                    test: /\.(png|jpe?g)/,
                    options: {
                        quality:  75
                    }
                }],
                overrideExtension: true,
                detailedLogs: false,
                silent: false,
                strict: true
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    PostcssPresetEnv
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                },
            },
            {
                test: /\.(png|jpe?g|webp|avif|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.output.img}/[name][ext]`
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options:{
                            mozjpeg: {
                                progressive: true,
                                quality: 75
                            },
                            pngquant: {
                                quality: [0.75, 0.75],
                            },
                        }
                    },
                ],

            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.output.fonts}/[name][ext]`
                }
            },
        ],
    },
};