process.traceDeprecation = true
// Docs: https://webpack.js.org/guides/asset-management/
const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const outputDirectory = 'dist';



function tryResolve_(url, sourceFilename) {
    // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
    // when the importer throws
    try {
        return require.resolve(url, {
            paths: [path.dirname(sourceFilename)]
        });
    } catch (e) {
        return '';
    }
}

function tryResolveScss(url, sourceFilename) {
    // Support omission of .scss and leading _
    const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`
    return tryResolve_(normalizedUrl, sourceFilename) ||
        tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
            sourceFilename)
}

function materialImporter(url, prev) {
    if (url.startsWith('@material')) {
        const resolved = tryResolveScss(url, prev)
        return {
            file: resolved || url
        }
    }
    return {
        file: url
    }
}

const isDev = process.env.NODE_ENV !== 'production'


// Module export
module.exports = {
    context: __dirname,
    mode: isDev ? 'development': 'production',

    //-- App entry-points (bundles)
    entry: {
        app: './src/index.js'
    },

    //-- Compilation destination resolution
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/static/'
    },

    module: {
        rules: [{
                test: [
                    /\.scss$/,
                    /\.css$/
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: ()=> [
                                autoprefixer()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: ['./node_modules'],
                            importer: materialImporter
                        }
                    },
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: [
                    /\.(png|jpg|gif)$/,
                    /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            useRelativePath: false
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].bundle.js'
        }),
        new CleanWebpackPlugin()
    ],

    watchOptions: {
        ignored: ['/node_modules/', 'venv', '.*']
    },

    
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist',
        hot: true,
        proxy: {
            '/api': 'http://localhost:5000'
        },
    },

    resolve: {
        extensions: ['.js', '.scss', '.css']
    },
    devtool: 'source-map'
};
