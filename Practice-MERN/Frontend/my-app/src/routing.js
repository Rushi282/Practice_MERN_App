import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import Content from './components/Content';
import Patient from './components/Patient';
import UpdatePatients from './components/UpdatePatients';


const customRoute = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/doctors',
                element: <Content />
            },
            {
                path: '/patients',
                element: <Patient />
            },
            {
                path: '/updatePatient',
                element: <UpdatePatients />
            }
        ]
    },
]);

export default customRoute;