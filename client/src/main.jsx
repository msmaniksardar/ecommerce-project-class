import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "./assets/css/main.css"
import "./assets/css/animate.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import "react-loading-skeleton/dist/skeleton.css"
import { Toaster, toast } from 'sonner'
createRoot(document.getElementById('root')).render(
  <>
      <Toaster position={"top-right"} />
    <App />
  </>,
)
