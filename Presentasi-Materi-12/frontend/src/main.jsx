import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SchoolDataProvider } from './contexts/SchoolDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SchoolDataProvider>
        <App />
      </SchoolDataProvider>
    </AuthProvider>
  </React.StrictMode>,
)
