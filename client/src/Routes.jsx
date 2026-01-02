import {createBrowserRouter } from 'react-router-dom';
import Container from './components/Container';
import Sidebar from './components/Sidebar';
import HardwareStoreSystem from './client/src/deepseek_javascript_20260102_c5f587.js'
const routes = createBrowserRouter([
    {
        path:'/',
        element:<HardwareStoreSystem />
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
