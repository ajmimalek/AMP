import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import fileAddFill from '@iconify/icons-eva/file-add-fill';
import fileRemoveFill from '@iconify/icons-eva/file-remove-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
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
  Chip,
  Container,
  Grid,
  Button,
  CardHeader
} from '@material-ui/core';
import { alpha, Box, styled } from '@material-ui/system';
import { Add, Check, GitHub, Timer } from '@material-ui/icons';
import faker from 'faker';
import palette from 'src/theme/palette';
import { MHidden } from 'src/components/@material-extend';
import { DataGrid } from '@material-ui/data-grid';
import NumericData from '../teamcity/NumericData';
import CodeCoverageChart from '../teamcity/CodeCoverageChart';

// -----------------Data From API----------------------------------
const ClassCoverage = [
  {
    name: 'Class Coverage Percent',
    value: faker.datatype.float().toString().concat(' %')
  },
  {
    name: 'Covered Classes',
    value: faker.datatype.number()
  },
  {
    name: 'Non Covered Classes',
    value: faker.datatype.number()
  },
  {
    name: 'Total Classes',
    value: faker.datatype.number()
  }
];
const MethodCoverage = [
  {
    name: 'Method Coverage Percent',
    value: faker.datatype.float().toString().concat(' %')
  },
  {
    name: 'Covered Methods',
    value: faker.datatype.number()
  },
  {
    name: 'Non Covered Methods',
    value: faker.datatype.number()
  },
  {
    name: 'Total Methods',
    value: faker.datatype.number()
  }
];
const StatementCoverage = [
  {
    name: 'Statement Coverage Percent',
    value: faker.datatype.float().toString().concat(' %')
  },
  {
    name: 'Covered Statements',
    value: faker.datatype.number()
  },
  {
    name: 'Non Covered Statements',
    value: faker.datatype.number()
  },
  {
    name: 'Total Statements',
    value: faker.datatype.number()
  }
];
const Filemanipulation = [
  {
    name: 'Added Files',
    value: 5,
    icon: <Icon icon={fileAddFill} color={palette.success.dark} width={32} height={32} />
  },
  {
    name: 'Edited Files',
    value: 2,
    icon: <Icon icon={fileTextFill} color={palette.warning.dark} width={32} height={32} />
  },
  {
    name: 'Deleted Files',
    value: 0,
    icon: <Icon icon={fileRemoveFill} color={palette.error.dark} width={32} height={32} />
  }
];
const columns = [
  { field: 'fName', headerName: 'File name', width: 190 },
  { field: 'changeType', headerName: 'Change Type', width: 40 }
];

const rows = [
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' },
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' },
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' },
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' },
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' },
  { fName: 'Public.Test/OrderQuantitiesModifiedTests.cs', changeType: 'added' }
];
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
const Middle = styled('div')({
  color: 'white',
  marginTop: '20px',
  '& > b': {
    lineHeight: '40px'
  }
});
const Right = styled('div')({
  color: 'white',
  marginRight: '15px',
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
                  <MHidden width="mdDown">
                    <CoverImgStyle alt="Tests" src="/static/illustrations/testing.jpg" />
                  </MHidden>
                  <Description>
                    <MHidden width="mdDown">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '20px'
                        }}
                      >
                        <Left>
                          # number
                          <div
                            style={{
                              textAlign: 'center',
                              marginLeft: '20px',
                              fontWeight: 'bold',
                              marginBottom: '60px'
                            }}
                          >
                            Build Name
                          </div>
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
                          />
                        </Left>
                        <Middle>
                          <div
                            style={{
                              textAlign: 'center',
                              marginTop: '20px'
                            }}
                          >
                            Tests passed: XX; inspections total: XX, errors: XX
                          </div>
                          <div
                            style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}
                          >
                            <div
                              style={{
                                display: 'inline',
                                backgroundColor: '#B71928',
                                fontWeight: 'bolder',
                                paddingBottom: '10px',
                                paddingTop: '10px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                textAlign: 'center',
                                borderRadius: '10px'
                              }}
                            >
                              0
                            </div>
                            &nbsp; errors, &nbsp;
                            <div
                              style={{
                                display: 'inline',
                                backgroundColor: '#B78103',
                                fontWeight: 'bolder',
                                paddingBottom: '10px',
                                paddingTop: '10px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                textAlign: 'center',
                                borderRadius: '10px',
                                width: '32px',
                                height: '30px'
                              }}
                            >
                              702
                            </div>
                            &nbsp; warnings.
                          </div>
                          <Box textAlign="center">
                            <Button variant="outlined" color="inherit" startIcon={<Add />} href="">
                              Details
                            </Button>
                          </Box>
                        </Middle>
                        <Right>
                          <div
                            style={{
                              backgroundColor: '#229A16',
                              fontWeight: 'bolder',
                              paddingBottom: '5px',
                              marginTop: '10px',
                              paddingTop: '5px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              marginBottom: '100px'
                            }}
                          >
                            BUILD SUCCESS
                          </div>
                          <b>Execution Time :</b>{' '}
                          <Chip
                            icon={<Timer />}
                            label="time" // change from API
                            variant="outlined"
                            size="small"
                            color="info"
                          />{' '}
                        </Right>
                      </div>
                    </MHidden>
                    <Container maxWidth="xl">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                          <NumericData
                            data={ClassCoverage}
                            title="Class Coverage"
                            textcolor={palette.primary.darker}
                            backgroundcolor={palette.primary.lighter}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <NumericData
                            data={MethodCoverage}
                            title="Method Coverage"
                            textcolor={palette.secondary.darker}
                            backgroundcolor={palette.secondary.lighter}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <NumericData
                            data={StatementCoverage}
                            title="Statement Coverage"
                            textcolor={palette.warning.darker}
                            backgroundcolor={palette.warning.lighter}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                          <CodeCoverageChart />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <NumericData data={Filemanipulation} title="File Manipulations" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Card>
                            <CardHeader title="Last Change Infos" sx={{ textAlign: 'center' }} />
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                          <DataGrid rows={rows} columns={columns} pageSize={5} />
                        </Grid>
                      </Grid>
                    </Container>
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
