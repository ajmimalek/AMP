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
  CardHeader,
  Avatar
} from '@material-ui/core';
import { alpha, Box, styled } from '@material-ui/system';
import { Add, Check, Clear, GitHub, Timer } from '@material-ui/icons';
import palette from 'src/theme/palette';
import { MHidden } from 'src/components/@material-extend';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { fPercent } from 'src/utils/formatNumber';
import account from 'src/_mocks_/account';
import NumericData from '../teamcity/NumericData';
import CodeCoverageChart from '../teamcity/CodeCoverageChart';

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

const styles = () => ({
  success: {
    backgroundColor: '#229A16'
  },
  failure: {
    backgroundColor: '#B71928'
  }
});

const useStyles = makeStyles(styles);
export default function UserMoreMenu() {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [teamCity, setTeamCity] = useState(false);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [branchName, setBranchName] = useState('');
  const [webURL, setWebURL] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(0);
  const [warnings, setWarnings] = useState(0);
  const [status, setStatus] = useState('');
  const [sucess, setSuccess] = useState(true);
  const [executionTime, setExecutionTime] = useState('');
  const [classPercent, setClassPercent] = useState(0.0);
  const [methodPercent, setMethodPercent] = useState(0.0);
  const [statementPercent, setStatementPercent] = useState(0.0);
  const [classCovered, setClassCovered] = useState(0);
  const [classNonCovered, setClassNonCovered] = useState(0);
  const [classTotal, setClassTotal] = useState(0);
  const [methodCovered, setMethodCovered] = useState(0);
  const [methodNonCovered, setMethodNonCovered] = useState(0);
  const [methodTotal, setMethodTotal] = useState(0);
  const [statementCovered, setStatementCovered] = useState(0);
  const [statementNonCovered, setStatementNonCovered] = useState(0);
  const [statementTotal, setStatementTotal] = useState(0);
  const [addedFiles, setAddedFiles] = useState(0);
  const [editedFiles, setEditedFiles] = useState(0);
  const [deletedFiles, setDeletedFiles] = useState(0);
  const [userName, setUserName] = useState('');
  const [dateChange, setDateChange] = useState('');
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);
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
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build/30819`, {
        // id must be passed through task table
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const content = await res.json();
      setTeamCity(true);
      console.log(content);
      setNumber(content.number);
      setName(content.name);
      setBranchName(content.branchName);
      setState(content.state);
      setDescription(content.description);
      setWebURL(content.webURL);
      setErrors(content.codeInspections.errors);
      setWarnings(content.codeInspections.warnings);
      setStatus(content.status);
      if (content.status === 'FAILURE') {
        setSuccess(false);
      }
      setExecutionTime(content.executionTime);
      // Code Coverage
      setClassCovered(content.codeCoverage.classCovered);
      setMethodCovered(content.codeCoverage.methodCovered);
      setStatementCovered(content.codeCoverage.statementCovered);
      setClassNonCovered(content.codeCoverage.classNonCovered);
      setMethodNonCovered(content.codeCoverage.methodNonCovered);
      setStatementNonCovered(content.codeCoverage.statementNonCovered);
      setClassTotal(content.codeCoverage.classTotal);
      setMethodTotal(content.codeCoverage.methodTotal);
      setStatementTotal(content.codeCoverage.statementTotal);
      setClassPercent(content.codeCoverage.classPercent);
      setMethodPercent(content.codeCoverage.methodPercent);
      setStatementPercent(content.codeCoverage.statementPercent);
      // File Manipulations
      setAddedFiles(content.changes.addedFiles);
      setEditedFiles(content.changes.editedFiles);
      setDeletedFiles(content.changes.deletedFiles);
      setFiles(content.changes.files);
      setUserName(content.changes.userName);
      setComment(content.changes.comment);
      setDateChange(content.changes.dateChange);
    })();
  };
  // -----------------Data From API----------------------------------
  const ClassCoverage = [
    {
      name: 'Class Coverage Percent',
      value: fPercent(classPercent)
    },
    {
      name: 'Covered Classes',
      value: classCovered
    },
    {
      name: 'Non Covered Classes',
      value: classNonCovered
    },
    {
      name: 'Total Classes',
      value: classTotal
    }
  ];
  const MethodCoverage = [
    {
      name: 'Method Coverage Percent',
      value: fPercent(methodPercent)
    },
    {
      name: 'Covered Methods',
      value: methodCovered
    },
    {
      name: 'Non Covered Methods',
      value: methodNonCovered
    },
    {
      name: 'Total Methods',
      value: methodTotal
    }
  ];
  const StatementCoverage = [
    {
      name: 'Statement Coverage Percent',
      value: fPercent(statementPercent)
    },
    {
      name: 'Covered Statements',
      value: statementCovered
    },
    {
      name: 'Non Covered Statements',
      value: statementNonCovered
    },
    {
      name: 'Total Statements',
      value: statementTotal
    }
  ];
  const CHART_DATA = [
    { data: [fPercent(classPercent), fPercent(methodPercent), fPercent(statementPercent)] }
  ];
  const Filemanipulation = [
    {
      name: 'Added Files',
      value: addedFiles,
      icon: <Icon icon={fileAddFill} color={palette.success.dark} width={32} height={32} />
    },
    {
      name: 'Edited Files',
      value: editedFiles,
      icon: <Icon icon={fileTextFill} color={palette.warning.dark} width={32} height={32} />
    },
    {
      name: 'Deleted Files',
      value: deletedFiles,
      icon: <Icon icon={fileRemoveFill} color={palette.error.dark} width={32} height={32} />
    }
  ];
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'File name', width: 330 },
    { field: 'changeType', headerName: 'Change Type', width: 190 }
  ];
  // ----------------------------------------------------------------------
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
                          # {number}
                          <div
                            style={{
                              textAlign: 'center',
                              marginLeft: '20px',
                              fontWeight: 'bold',
                              marginBottom: '60px'
                            }}
                          >
                            {name}
                          </div>
                          <b>State :</b>{' '}
                          <Chip
                            icon={state === 'finished' ? <Check /> : <Clear />} // Finished : Check ,Not finished : Clear
                            label={state}
                            variant="outlined"
                            size="small"
                            color={state === 'finished' ? 'success' : 'error'} // Finished : success ,Not finished : error
                          />{' '}
                          <br />
                          <b>Branch :</b>{' '}
                          <Chip
                            icon={<GitHub />}
                            label={branchName}
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
                            {description}
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
                              {errors}
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
                              {warnings}
                            </div>
                            &nbsp; warnings.
                          </div>
                          <Box textAlign="center">
                            <Button
                              variant="outlined"
                              target="_blank"
                              color="inherit"
                              startIcon={<Add />}
                              href={webURL}
                            >
                              Details
                            </Button>
                          </Box>
                        </Middle>
                        <Right>
                          <div
                            className={sucess ? classes.success : classes.failure}
                            style={{
                              fontWeight: 'bolder',
                              paddingBottom: '5px',
                              marginTop: '10px',
                              paddingTop: '5px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              marginBottom: '100px'
                            }}
                          >
                            BUILD {status}
                          </div>
                          <b>Execution Time :</b>{' '}
                          <Chip
                            icon={<Timer />}
                            label={executionTime} // change from API
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
                          <CodeCoverageChart CHART_DATA={CHART_DATA} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <NumericData data={Filemanipulation} title="File Manipulations" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Card sx={{ textAlign: 'center', height: 344 }}>
                            <CardHeader title="Last Change Infos" />
                            <CardContent>
                              <b>Done by : </b>{' '}
                              <Chip
                                avatar={<Avatar alt="last change actor" src={account.photoURL} />}
                                label={userName}
                                variant="outlined"
                              />
                              <div
                                style={{
                                  backgroundColor: '#B71928',
                                  color: 'white',
                                  fontWeight: 'bolder',
                                  width: '50%',
                                  paddingBottom: '10px',
                                  paddingTop: '10px',
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                  marginRight: 'auto',
                                  marginLeft: 'auto',
                                  marginTop: '10px',
                                  textAlign: 'center',
                                  borderRadius: '10px'
                                }}
                              >
                                {dateChange}
                              </div>
                              {comment}
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                          <div style={{ height: 344 }}>
                            <DataGrid
                              rows={files}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[2, 5, 7]}
                            />
                          </div>
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
