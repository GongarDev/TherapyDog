import React from 'react'
import ReactDOM from 'react-dom/client'
import { TherapyDogApp } from './TherapyDogApp.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TherapyDogApp />
  </React.StrictMode>,
)
