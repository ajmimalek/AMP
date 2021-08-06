import { Container, Tab, Tabs, Tooltip, Typography } from '@material-ui/core'; // components
import { Box } from '@material-ui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import StoryList from 'src/components/_dashboard/stories/StoryList';
import Page from '../components/Page'; //
import STORIES from '../_mocks_/stories';

// ----------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function EcommerceShop() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Page title="Sprints | Linedata-AMP">
      <Container>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            display: 'flex'
          }}
        >
          <img
            src="/static/icons/Agile.svg"
            alt="Sprint"
            style={{ width: '30px', height: '30px', marginRight: '10px' }}
          />
          Sprints
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="sprint tabs">
            <Tooltip title="My name is Sprint1" placement="top" arrow>
              <Tab label="Sprint One" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="My name is Sprint2" placement="top" arrow>
              <Tab label="Sprint Two" {...a11yProps(1)} />
            </Tooltip>
            <Tooltip title="My name is Sprint3" placement="top" arrow>
              <Tab label="Sprint Three" {...a11yProps(2)} />
            </Tooltip>
            <Tooltip title="My name is Sprint4" placement="top" arrow>
              <Tab label="Sprint Four" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="My name is Sprint5" placement="top" arrow>
              <Tab label="Sprint Five" {...a11yProps(1)} />
            </Tooltip>
            <Tooltip title="My name is Sprint6" placement="top" arrow>
              <Tab label="Sprint Six" {...a11yProps(2)} />
            </Tooltip>
          </Tabs>
        </Box>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            <StoryList stories={STORIES} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StoryList stories={STORIES} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <StoryList stories={STORIES} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <StoryList stories={STORIES} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <StoryList stories={STORIES} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <StoryList stories={STORIES} />
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Page>
  );
}
