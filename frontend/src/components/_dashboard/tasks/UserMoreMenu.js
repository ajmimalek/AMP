import { Icon } from '@iconify/react';
import { forwardRef, useRef, useState } from 'react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import teamcityIcon from '@iconify/icons-simple-icons/teamcity';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Card,
  CardContent,
  Modal
} from '@material-ui/core';
import { alpha, styled } from '@material-ui/system';

// ----------------------------------------------------------------------
// Slide animation for forget Password
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '10%',
  objectFit: 'cover',
  position: 'absolute',
  borderRadius: '10px',
  filter: 'brightness(40%)'
});

const TeamCityLoader = styled('div')({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  '& > p': {
    textAlign: 'center'
  },
  '& > img': {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const GeneralInfos = styled('div')({});

export default function UserMoreMenu() {
  const ref = useRef(null);
  const timeOut = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [teamCity, setTeamCity] = useState(false);

  const showTeamCity = () => {
    // showing teamcity report after loading
    setTeamCity(true);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  // Open for modal (teamcity)
  const style = {
    position: 'fixed',
    // overflow: 'scroll',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24
  };
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      showTeamCity();
    }, 3000);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleDialogOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={teamcityIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="TeamCity" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Modal open={open} onClose={handleDialogClose} TransitionComponent={Transition}>
          <Card sx={style}>
            <CardContent>
              {teamCity ? (
                <CardMediaStyle
                  sx={{
                    pt: 'calc(100% * 4 / 3)',
                    '&:after': {
                      top: 0,
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                    }
                  }}
                >
                  <CoverImgStyle alt="Tests" src="/static/illustrations/testing.jpg" />
                  <GeneralInfos />
                </CardMediaStyle>
              ) : (
                <TeamCityLoader>
                  <img alt="TeamCityLogo" src="/static/icons/icon-teamcity.svg" /> <br />
                  <p>Loading reports please wait...</p>
                </TeamCityLoader>
              )}
            </CardContent>
          </Card>
        </Modal>
      </Menu>
    </>
  );
}
