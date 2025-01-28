import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router';
import Input from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeProfiles, searchEmployeeProfiles } from '../../redux/slice/HREmployeeApplicationSlice';

function EmployeeProfiles() {
  const employeeProfilesSearched = useSelector((state) => state.HREmployeeApplication.employeeProfilesSearched);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchEmployeeProfiles());
  }, []);

  const searchEmployees = (e) => {
    const name = e.target.value.toLowerCase();
    dispatch(searchEmployeeProfiles(name));
  }

  return (
    <>
    <div style={{padding: '60px'}}>
      <div>Total Employees ({employeeProfilesSearched.length})</div>
      <Input onChange={searchEmployees} sx={{ minWidth: 650, margin: '20px' }} label='search employee name'/>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">SSN</TableCell>
              <TableCell align="right">Work Authorization Title</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeProfilesSearched.map((employeeProfile) => (
              <TableRow
                key={employeeProfile.profile_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={"/hr/employeeProfile/" + employeeProfile.profile_id}>
                    {employeeProfile.firstName} {`${employeeProfile.preferredName ? "(" + employeeProfile.preferredName + ")" : ""}`} {employeeProfile.lastName}
                  </Link>
                </TableCell>
                <TableCell align="right">{employeeProfile.SSN}</TableCell>
                <TableCell align="right">{employeeProfile.authorization}</TableCell>
                <TableCell align="right">{employeeProfile.phone}</TableCell>
                <TableCell align="right">{employeeProfile.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  )
}

export default EmployeeProfiles;