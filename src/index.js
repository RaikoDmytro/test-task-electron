import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from "./context/auth-context";
import { OrganizationProvider } from "./context/organization-context";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <OrganizationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </OrganizationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
