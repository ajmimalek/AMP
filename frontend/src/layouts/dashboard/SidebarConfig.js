import { Apps, ChromeReaderMode, Dashboard } from '@material-ui/icons';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Dashboard />
  },
  {
    title: 'projects',
    path: '/dashboard/projects',
    icon: <Apps />
  },
  {
    title: 'board',
    path: '/dashboard/board',
    icon: <ChromeReaderMode />
  },
  {
    title: 'tasks',
    path: '/dashboard/tasks',
    icon: <AssignmentTurnedInIcon />
  }
];

export default sidebarConfig;
