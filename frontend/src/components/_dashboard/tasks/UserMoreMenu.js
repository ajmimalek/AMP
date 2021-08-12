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
  Dialog,
  useMediaQuery,
  DialogContent,
  Card,
  CardContent
} from '@material-ui/core';
import { useTheme } from '@emotion/react';
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
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function UserMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
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

        <MenuItem onClick={handleClickOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={teamcityIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="TeamCity" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
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
                </CardMediaStyle>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </Menu>
    </>
  );
}
