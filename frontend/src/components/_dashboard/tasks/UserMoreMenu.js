import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import teamcityIcon from '@iconify/icons-simple-icons/teamcity';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Modal,
  Chip
} from '@material-ui/core';
import { alpha, styled } from '@material-ui/system';
import { Check, GitHub, Timer } from '@material-ui/icons';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '15%',
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

const Description = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});
const Left = styled('div')({
  color: 'white',
  marginLeft: '15px',
  marginTop: '20px',
  '& > b': {
    lineHeight: '40px'
  }
});

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
    overflow: 'scroll',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: '90%',
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
        <MenuItem onClick={handleDialogOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={teamcityIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="TeamCity" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Modal open={open} onClose={handleDialogClose}>
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
                  <Description>
                    <Left>
                      # number : name <br />
                      <b>State :</b>{' '}
                      <Chip
                        icon={<Check />} // Finished : Check ,Not finished : Clear
                        label="finished" // change from API
                        variant="outlined"
                        size="small"
                        color="success" // Finished : success ,Not finished : error
                      />{' '}
                      <br />
                      <b>Branch :</b>{' '}
                      <Chip
                        icon={<GitHub />}
                        label="master" // change from API
                        variant="outlined"
                        size="small"
                        color="warning"
                      />{' '}
                      <br />
                      <b>Waiting Time :</b>{' '}
                      {/* https://next.material-ui.com/components/chips/#main-content */}
                      <Chip
                        icon={<Timer />}
                        label="time" // change from API
                        variant="outlined"
                        size="small"
                        color="info"
                      />{' '}
                      <br />
                      <b>Execution Time :</b>{' '}
                      <Chip
                        icon={<Timer />}
                        label="time" // change from API
                        variant="outlined"
                        size="small"
                        color="info"
                      />{' '}
                    </Left>
                  </Description>
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
