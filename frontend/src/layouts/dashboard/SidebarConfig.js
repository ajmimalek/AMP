import { Build, Dashboard } from '@material-ui/icons';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Dashboard />
  },
  {
    title: 'builds',
    path: '/dashboard/builds',
    icon: <Build />
  }
];

export default sidebarConfig;
