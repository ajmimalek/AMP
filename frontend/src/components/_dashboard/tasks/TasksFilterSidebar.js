import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  TextField,
  Autocomplete,
  Avatar
} from '@material-ui/core'; //

import { Bookmark, Face, Timelapse } from '@material-ui/icons';
import { LocalizationProvider, MobileDateRangePicker } from '@material-ui/lab';
import users from 'src/_mocks_/user';
import { styled } from '@material-ui/styles';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.25)
}));
export const SORT_BY_OPTIONS = [
  {
    value: 'featured',
    label: 'Featured'
  },
  {
    value: 'newest',
    label: 'Newest'
  },
  {
    value: 'priceDesc',
    label: 'Price: High-Low'
  },
  {
    value: 'priceAsc',
    label: 'Price: Low-High'
  }
];
export const FILTER_STORY_OPTIONS = [
  {
    value: 'below',
    label: 'Below $25'
  },
  {
    value: 'between',
    label: 'Between $25 - $75'
  },
  {
    value: 'above',
    label: 'Above $75'
  }
];

TasksFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object
};
export default function TasksFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik
}) {
  const { handleChange } = formik;
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: {
                width: 280,
                border: 'none',
                overflow: 'hidden'
              }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 1,
                py: 2
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  ml: 1
                }}
              >
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Stack
              spacing={19}
              sx={{
                p: 3
              }}
            >
              <div>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  <Timelapse sx={{ marginBottom: '-4px' }} /> Period
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateRangePicker
                    showTodayButton
                    startText="Start Date"
                    endText="End Date"
                    value={formik.values.selectedDate}
                    onChange={handleChange('selectedDate')}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 1 }}> </Box>
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  <Bookmark sx={{ marginBottom: '-4px' }} /> Story
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-stories"
                  options={FILTER_STORY_OPTIONS}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Choose your story..." />}
                />
              </div>

              <div>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  <Face sx={{ marginBottom: '-4px' }} /> Developper
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-stories"
                  options={users}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Choose your story..." />}
                  renderOption={(props, option) => (
                    <AccountStyle {...props}>
                      <Avatar src={option.avatarUrl} alt="photoURL" />
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                          {option.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {option.mail}
                        </Typography>
                      </Box>
                    </AccountStyle>
                  )}
                />
              </div>
              <Box
                sx={{
                  p: 3
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  color="inherit"
                  variant="outlined"
                  onClick={onResetFilter}
                  startIcon={<Icon icon={roundClearAll} />}
                >
                  Clear All
                </Button>
              </Box>
            </Stack>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
