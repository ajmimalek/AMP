import { useRef, useState } from 'react';

import { alpha } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core'; // components

import NavSection from 'src/components/NavSection';
import menuOutline from '@iconify/icons-eva/menu-outline';
import { Icon } from '@iconify/react';
import MenuPopover from '../../components/MenuPopover'; //

import sidebarConfig from './SidebarConfig';

export default function MainMenuPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Icon icon={menuOutline} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          width: 220
        }}
      >
        <NavSection navConfig={sidebarConfig} />
      </MenuPopover>
    </>
  );
}
