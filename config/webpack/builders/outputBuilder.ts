import { Configuration } from 'webpack'

import { ConfigOptions } from '../types'

type Output = Exclude<Configuration['output'], undefined>

export function outputBuilder(configOptions: ConfigOptions): Output {
    return {
        clean: true,
        filename: '[name].[contenthash].js',
        path: configOptions.pathToOutputFolder
    }
}
