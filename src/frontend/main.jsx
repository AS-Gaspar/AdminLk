import React from 'react';
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div>
      <h1>Hello from React!</h1>
      <p>If you see this, React is working.</p>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)