import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider clientId="287206646911-6te9g0u73dnlu1a6af3qpu6uek9be4u8.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)