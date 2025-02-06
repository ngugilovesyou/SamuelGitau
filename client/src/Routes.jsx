import {createBrowserRouter } from 'react-router-dom';
import App from './App';
import Container from './components/Container';
import Sidebar from './components/Sidebar';

const routes = createBrowserRouter([
    {
        path:'/',
        element:<App />
    },
    {
        path:'/portfolio',
        element:<Container />
    },
    {
        path:'/home',
        element:<Sidebar />
    }
])

export default routes