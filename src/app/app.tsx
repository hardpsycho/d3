import { type FC } from 'react'

import { VerticalBar } from '@features/verticalBar'
import { bars, levels } from 'src/data'

interface AppProps {}

const App: FC<AppProps> = () => {
    return <VerticalBar bars={bars} max={300} levels={levels}/>
}

export { App }
