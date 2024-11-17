import { createRoot } from 'react-dom/client'

import { App } from './app/app'

const rootContainer = document.getElementById('app')
if (!rootContainer) throw new Error('There is root container not exist in document')

const root = createRoot(rootContainer)

root.render(<App />)
