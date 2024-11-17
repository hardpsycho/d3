import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { DefinePlugin, ProgressPlugin, WebpackPluginInstance } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { ConfigOptions } from '../types'

export function pluginBuilder(configOptions: ConfigOptions): WebpackPluginInstance[] {
    const plugins = [
        new ProgressPlugin(),
        new HtmlWebpackPlugin({ template: configOptions.pathToIndexHtml }),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            WP_DEV: JSON.stringify(configOptions.isDev)
        })
    ]

    if (configOptions.isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (configOptions.analyze) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
