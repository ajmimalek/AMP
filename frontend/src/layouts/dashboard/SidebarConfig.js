import { Dashboard } from '@material-ui/icons';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Dashboard />
  },
  {
    title: 'sprints',
    path: '/dashboard/sprints',
    icon: (
      <img
        src="/static/icons/Agile.svg"
        alt="Sprint"
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
    )
  },
  {
    title: 'tasks',
    path: '/dashboard/tasks',
    icon: <AssignmentTurnedInIcon />
  }
];

export default sidebarConfig;
