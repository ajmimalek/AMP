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
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  TextField
} from '@material-ui/core'; //

import { Timelapse } from '@material-ui/icons';
import { DateRangePicker, LocalizationProvider } from '@material-ui/lab';
import Scrollbar from '../../Scrollbar';

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
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
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
  const { values, getFieldProps, handleChange } = formik;
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

            <Scrollbar>
              <Stack
                spacing={3}
                sx={{
                  p: 3
                }}
              >
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    <Timelapse sx={{ marginBottom: '-4px' }} /> Period
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      value={formik.values.selectedDate}
                      onChange={handleChange}
                      renderInput={(startProps, endProps) => (
                        <>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </>
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Price
                  </Typography>
                  <RadioGroup {...getFieldProps('priceRange')}>
                    {FILTER_PRICE_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '& > :first-of-type': {
                            py: 0.5
                          },
                          '&:hover': {
                            opacity: 0.48,
                            '& > *': {
                              bgcolor: 'transparent'
                            }
                          },
                          ...(values.rating.includes(item) && {
                            bgcolor: 'background.neutral'
                          })
                        }}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Stack>
            </Scrollbar>

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
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
