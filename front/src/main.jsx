import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </AuthProvider>
    </BrowserRouter>
    
)
