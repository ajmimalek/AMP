import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import cookie from 'js-cookie';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Sprints from './pages/Sprints';
import Tasks from './pages/Tasks';
import NotFound from './pages/Page404';
import Profile from './pages/Profile';

// ----------------------------------------------------------------------
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = cookie.get('jwt');
    if (cookieChecked) {
      return true;
    }
  }
  return false;
};

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'builds', element: <Tasks /> },
        { path: 'sprints', element: <Sprints /> },
        { path: 'profile', element: <Profile /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
