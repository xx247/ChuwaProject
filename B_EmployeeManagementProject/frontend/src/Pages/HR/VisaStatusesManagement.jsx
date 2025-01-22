import './VisaStatusesManagement.css';
import { getInProgressEmployeeVisaStatuses, getAllEmployeeVisaStatuses } from '../../Services/hr';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function VisaStatusesManagement() {
    const [ inProgressEmployeeVisaStatuses, setInProgressEmployeeVisaStatuses ] = useState([]);
    const [ allEmployeeVisaStatuses, setAllEmployeeVisaStatuses] = useState({});

    useEffect(() => {
        getInProgressEmployeeVisaStatuses().then((statuses) => setInProgressEmployeeVisaStatuses(statuses));
        getAllEmployeeVisaStatuses().then((statuses) => setAllEmployeeVisaStatuses(statuses));
    }, []);

    return (
        <>
        <div>View In-progress visa statuses</div>
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Next Steps</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inProgressEmployeeVisaStatuses.map((employeeProfile) => (
              <TableRow
                key={employeeProfile._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employeeProfile.name}
                </TableCell>
                <TableCell align="right">{employeeProfile.workAuthorization.visaTitle}</TableCell>
                <TableCell align="right">{employeeProfile.workAuthorization.startDate}</TableCell>
                <TableCell align="right">{employeeProfile.workAuthorization.endDate}</TableCell>
                <TableCell align="right">{employeeProfile.nextStep}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>View all employee visa statuses</div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(allEmployeeVisaStatuses).map((person) => (
              <TableRow
                key={person}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person}
                </TableCell>
                <TableCell align="right">{allEmployeeVisaStatuses[person].workAuthorization.visaTitle}</TableCell>
                <TableCell align="right">{allEmployeeVisaStatuses[person].workAuthorization.startDate}</TableCell>
                <TableCell align="right">{allEmployeeVisaStatuses[person].workAuthorization.endDate}</TableCell>
                <TableCell align="right">{allEmployeeVisaStatuses[person].documents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    );
}

export default VisaStatusesManagement;