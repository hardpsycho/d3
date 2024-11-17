import { Configuration } from 'webpack'

type Mode = Exclude<Configuration['mode'], undefined | 'none'>

export interface ConfigOptions {
    pathToEntry: string
    pathToOutputFolder: string
    pathToIndexHtml: string
    mode: Mode
    port: number
    isDev: boolean
    analyze: boolean
}

export interface WebpackArgs {
    port?: string
    mode?: Mode
    analyze?: string
}
