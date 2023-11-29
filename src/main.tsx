import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "sonner"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster theme="system" richColors expand visibleToasts={6} position="top-right" />

  </React.StrictMode>,
)
