import { getEmailRegistrationLink } from '../../Services/hr';
import Input from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmailRegistrations, fetchOnboardingApplications } from '../../redux/slice/HREmployeeApplicationSlice';

function HiringManagement() {
  const pendingOnboardingApplications = useSelector((state) => state.HREmployeeApplication.onboardingApplications?.['Pending']) ?? [];
  const approvedOnboardingApplications = useSelector((state) => state.HREmployeeApplication.onboardingApplications?.['Approved']) ?? [];
  const rejectedOnboardingApplications = useSelector((state) => state.HREmployeeApplication.onboardingApplications?.['Rejected']) ?? [];
  const emailRegistrations = useSelector((state) => state.HREmployeeApplication.emailRegistrations);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOnboardingApplications('Pending'));
    dispatch(fetchOnboardingApplications('Approved'));
    dispatch(fetchOnboardingApplications('Rejected'));
    dispatch(fetchEmailRegistrations());
  }, []);

  const sendRegistrationEmail = () => {
    getEmailRegistrationLink(name, email);
    navigate(0);
  }

  const inputName = (e) => {
    setName(e.target.value);
  }

  const inputEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <>
    <div style={{padding: '60px'}}>
      <div style={{margin: '15px' }}>Registration tokens</div>
      <Input label="name" onChange={inputName} sx={{ margin: '5px' }} />
      <Input label="email" onChange={inputEmail} sx={{ margin: '5px' }}/>
      <Button variant="contained" onClick={sendRegistrationEmail} sx={{ margin: '5px', padding: '15px' }}>Generate token and send email</Button>
      <div style={{margin: '15px' }}>Past Registrations ({emailRegistrations.length})</div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emailRegistrations.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">
                {String(row.registered)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <div style={{margin: '25px' }}>Onboarding Application Reviews</div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell>Pending Applications</TableCell>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">View Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingOnboardingApplications.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row._id}>
                  View Application
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableCell>Approved Applications</TableCell>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">View Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {approvedOnboardingApplications.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row._id}>
                  View Application
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableCell>Rejected Applications</TableCell>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">View Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rejectedOnboardingApplications.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row._id}>
                  View Application
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}

export default HiringManagement;