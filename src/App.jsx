import * as React from 'react'
import { createRoot } from 'react-dom/client'

// Create a container element for your app
const appContainer = document.createElement('div')
document.body.appendChild(appContainer)

// Use the container element as the root for your React app
const root = createRoot(appContainer)

root.render(
  <div>
    <h2>Hello from React!</h2>
  </div>
)
