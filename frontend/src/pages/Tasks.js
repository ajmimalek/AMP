import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';

import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Select,
  MenuItem
} from '@material-ui/core'; // components

import CartWidget from 'src/components/_dashboard/tasks/TasksCartWidget';
import { useFormik } from 'formik';
import { styled } from '@material-ui/styles';
import { Cancel, CheckCircle } from '@material-ui/icons';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/tasks'; //
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'userName',
    label: 'Username',
    alignRight: false
  },
  {
    id: 'status',
    label: 'Status',
    alignRight: true
  },
  {
    id: ''
  }
]; // ----------------------------------------------------------------------
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
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

function Tasks() {
  const [teamCity, setTeamCity] = useState(false);
  const [filter, setFilter] = useState(false);
  const [builds, setBuilds] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const content = await res.json();
      setTeamCity(true);
      console.log(content);
      setBuilds(content);
    })();
  }, []);
  const formik = useFormik({
    initialValues: {
      story: ''
    },
    onSubmit: () => {}
  });
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('userName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = builds.map((n) => n.userName);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const filterbuilds = (value) => {
    if (value === 'success') {
      setFilter(true);
      (async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build/success`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const content = await res.json();
        setFilter(false);
        console.log(content);
        setBuilds(content);
      })();
    } else if (value === 'failed') {
      setFilter(true);
      (async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build/failed`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const content = await res.json();
        setFilter(false);
        console.log(content);
        setBuilds(content);
      })();
    } else {
      setFilter(true);
      (async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const content = await res.json();
        setFilter(false);
        console.log(content);
        setBuilds(content);
      })();
    }
  };

  const handleClick = (event, userName) => {
    const selectedIndex = selected.indexOf(userName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - builds.length) : 0;
  const filteredUsers = applySortFilter(builds, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Builds List | Linedata-AMP">
      {teamCity ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Builds
            </Typography>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              mb: 5
            }}
          >
            <Select
              labelId="gender-label"
              id="Status"
              sx={{ width: '200px' }}
              label="successful or failed builds"
              value={formik.values.story}
              onChange={(e, value) => {
                console.log(value.props.value);
                formik.setFieldValue('story', value.props.value);
                filterbuilds(value.props.value);
              }}
            >
              <MenuItem value="success">
                {' '}
                <CheckCircle color="success" /> Successful Builds
              </MenuItem>
              <MenuItem value="failed">
                {' '}
                <Cancel color="error" /> Failed Builds
              </MenuItem>
              <MenuItem value="all"> All Builds</MenuItem>
            </Select>
          </Stack>
          {filter ? <div>Please wait...</div> : null}
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer
                sx={{
                  minWidth: 800
                }}
              >
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={builds.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, userName, status } = row;
                        const isItemSelected = selected.indexOf(userName) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, userName)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {userName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <Label
                                variant="ghost"
                                color={status === 'FAILURE' ? 'error' : 'success'}
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu id={id} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{
                            py: 3
                          }}
                        >
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={builds.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
          <CartWidget count={builds.length} />
        </Container>
      ) : (
        <TeamCityLoader>
          <img alt="TeamCityLogo" src="/static/icons/icon-teamcity.svg" /> <br />
          <p>Loading builds table please wait...</p>
        </TeamCityLoader>
      )}
    </Page>
  );
}

export { Tasks as default };
