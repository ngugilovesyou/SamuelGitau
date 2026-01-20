import { createBrowserRouter } from 'react-router-dom';
import Container from './components/Container';
import Sidebar from './components/Sidebar';
import HardwareStoreSystem from './deepseek_javascript_20260102_c5f587.jsx';
import CleanersMarketplace from "./Company.jsx"
const routes = createBrowserRouter([
    {
        path: '/',
        element: < CleanersMarketplace/>
    },
    {
        path: '/portfolio',
        element: <Container />
    },
    {
        path: '/home',
        element: <Sidebar />
    }
]);

export default routes;
