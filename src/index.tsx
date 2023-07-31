import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { initializeProjects } from './utils/LocalStorage'

import './index.scss'

import App from './App'

const root = document.getElementById('root')

if (root) {
    initializeProjects()
    ReactDOM
        .createRoot(root)
        .render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        )
}
