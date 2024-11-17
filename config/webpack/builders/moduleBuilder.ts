import { ModuleOptions, RuleSetRule } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'

import { ConfigOptions } from '../types'

export function moduleBuilder(configOption: ConfigOptions): ModuleOptions {
    const tsLoaderRule: RuleSetRule = {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: configOption.isDev
            ? {
                  getCustomTransformers: () => ({
                      before: [ReactRefreshTypeScript()]
                  })
              }
            : undefined
    }

    const styleLoadersRule: RuleSetRule = {
        test: /\.s?[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            configOption.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: configOption.isDev
                            ? '[path]/[local]__[hash:base64:3]'
                            : '[hash:base64:6]',
                        auto: /\.(module|m)\.\w+$/i, // коротакая запись модулей можно .module. или .m.
                        // in Components camelCase, but in scss and css with dash
                        exportLocalsConvention: 'camelCase'
                    }
                }
            },
            // Compiles Sass to CSS
            'sass-loader'
        ]
    }

    const svgLoader: RuleSetRule = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack']
    }

    const svgLoaderInline: RuleSetRule = {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/ // *.svg?url
    }

    return {
        rules: [tsLoaderRule, styleLoadersRule, svgLoader, svgLoaderInline]
    }
}
