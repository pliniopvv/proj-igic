import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/error-not-found';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientView from './views/ClientView';
import ClientCreate from './views/ClientCreate';
import ClientEdit from './views/ClientEdit';
import PageRoot from './views/PageRoot';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageRoot />,
    errorElement: <ErrorPage/>,
    children:
    [{
      path: "/incluir",
      element: <ClientCreate/>
    },
    {
      path: "/ver",
      element: <ClientView/>
    },
    {
      path: "/editar/:personId",
      element: <ClientEdit/>,
    }]
  },
  

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <main>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </main>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
