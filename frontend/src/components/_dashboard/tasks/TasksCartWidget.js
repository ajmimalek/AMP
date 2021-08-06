// material
import { styled } from '@material-ui/core/styles';
import { Badge, Tooltip } from '@material-ui/core';
import { AssignmentLate } from '@material-ui/icons';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  return (
    <Tooltip title="ToDo Tasks" arrow>
      <RootStyle>
        <Badge showZero badgeContent={0} color="error" max={99}>
          <AssignmentLate />
        </Badge>
      </RootStyle>
    </Tooltip>
  );
}
