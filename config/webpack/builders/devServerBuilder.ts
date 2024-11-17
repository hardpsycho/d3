import { Configuration } from 'webpack-dev-server'

import { ConfigOptions } from '../types'

export function devServerBuilder(configOptions: ConfigOptions): Configuration {
    return {
        port: configOptions.port,
        historyApiFallback: true,
        hot: true
    }
}
