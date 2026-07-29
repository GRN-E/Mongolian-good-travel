import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { LangProvider } from './i18n/LanguageContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        {/* reducedMotion="user" — honors OS "reduce motion" setting automatically */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
)
