import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from "@heroui/react";
import './styles/tailwind.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { AuthProvider } from './context/AuthProvider';
import { AlertProvider } from './context/AlertContext.jsx';
import GlobalAlert from './components/alerts/GlobalAlert';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthProvider>
        <AlertProvider>
          <GlobalAlert />
          <RouterProvider router={router} />
        </AlertProvider>
      </AuthProvider>
    </HeroUIProvider>
  </StrictMode>
);