import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StatusCode from './StatusCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StatusCode />
  </StrictMode>,
)
