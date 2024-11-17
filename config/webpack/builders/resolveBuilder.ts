import path from 'path'

import { ResolveOptions } from 'webpack'

export function resolveBuilder(): ResolveOptions {
    const rootFolder = path.resolve(__dirname, '../../..')

    return {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.join(rootFolder, 'src'), path.join(rootFolder), 'node_modules'],
        alias: {
            '@config': [path.join(rootFolder, 'config/')],
            '@public': [path.join(rootFolder, 'public/')],
            '@app': [path.join(rootFolder, 'src/app/')],
            '@shared': [path.join(rootFolder, 'src/shared/')],
            '@entities': [path.join(rootFolder, 'src/entities/')],
            '@features': [path.join(rootFolder, 'src/features/')],
            '@pages': [path.join(rootFolder, 'src/pages/')],
            '@widgets': [path.join(rootFolder, 'src/widgets/')],
            '@layouts': [path.join(rootFolder, 'src/layouts/')]
        },
        preferAbsolute: true
    }
}
