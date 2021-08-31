import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
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

import { Cancel, CheckCircle, Face } from '@material-ui/icons';
import users from 'src/_mocks_/user';
import { styled } from '@material-ui/styles';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.25)
}));

const StoriesStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {}
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
    icon: <CheckCircle color="success" />,
    value: 'success',
    label: 'Successful Builds'
  },
  {
    icon: <Cancel color="error" />,
    value: 'failed',
    label: 'Failed Builds'
  },
  {
    value: 'all',
    label: 'All Builds'
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
  const filterbuilds = (value) => {
    if (value === 'success') {
      console.log('Success');
    } else if (value === 'failed') {
      console.log('Failed');
    } else {
      console.log('All');
    }
  };
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
                height: '100%',
                border: 'none',
                overflow: 'scroll'
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
              {/* <div>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  <Timelapse sx={{ marginBottom: '-4px' }} /> Period
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    value={formik.values.selectedDate}
                    onChange={(selectedDate) => {
                      selectedDate.forEach((element, index) => {
                        console.log(element);
                        console.log(index);
                        formik.setFieldValue(`selectedDate[${index}]`, element);
                      });
                    }}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 1 }}> </Box>
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
                    </div> */}

              <StoriesStyle>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  Status
                </Typography>
                <Autocomplete
                  disablePortal
                  clearIcon={null}
                  id="combo-box-stories"
                  options={FILTER_STORY_OPTIONS}
                  onChange={(e, value) => {
                    handleChange('story');
                    filterbuilds(value.value);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Choose a status..." />}
                  renderOption={(props, option) => (
                    <AccountStyle {...props}>
                      {option.icon}
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {option.label}
                        </Typography>
                      </Box>
                    </AccountStyle>
                  )}
                />
              </StoriesStyle>

              <div>
                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
                  <Face sx={{ marginBottom: '-4px' }} /> Developper
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-dev"
                  options={users}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Choose a username..." />}
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
