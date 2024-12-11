import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react'
import './styles/tailwind.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { AuthProvider } from './context/AuthProvider';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider>
        {/* <RouterProvider router={router} /> */}
        <App/>
      </AuthProvider>
    </NextUIProvider>
  </StrictMode>
);
