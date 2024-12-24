import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
// Supports weights 200-900
import '@fontsource-variable/cairo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
