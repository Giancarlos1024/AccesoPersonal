import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { NavegationRoute } from './assets/routes/NavegationRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavegationRoute />
  </StrictMode>,
)
