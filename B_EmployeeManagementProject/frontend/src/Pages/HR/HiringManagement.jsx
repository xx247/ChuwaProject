import './HiringManagement.css';
import { getEmailRegistrationLink, getEmailRegistrations, getOnboardingApplications } from '../../Services/hr';
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

function HiringManagement() {
  const [ pendingOnboardingApplications, setPendingOnboardingApplications ] = useState([]);
  const [ approvedOnboardingApplications, setApprovedOnboardingApplications ] = useState([]);
  const [ rejectedOnboardingApplications, setRejectedOnboardingApplications ] = useState([]);
  const [ emailRegistrations, setEmailRegistrations ] = useState([]);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getOnboardingApplications("Pending").then((application) => setPendingOnboardingApplications(application));
    getOnboardingApplications("Approved").then((application) => setApprovedOnboardingApplications(application));
    getOnboardingApplications("Rejected").then((application) => setRejectedOnboardingApplications(application));
    getEmailRegistrations().then((registration) => setEmailRegistrations(registration));
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
      <div>Hiring Management</div>

      <div>Registration tokens</div>
      <Input label="name" onChange={inputName}/>
      <Input label="email" onChange={inputEmail}/>
      <Button variant="contained" onClick={sendRegistrationEmail}>Generate token and send email</Button>
      <div>Past Registrations</div>
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

      <div>Onboarding Application Reviews</div>
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row.id}>
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row.id}>
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={"/hr/onboardingApplication/" + row.id}>
                  View Application
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default HiringManagement;