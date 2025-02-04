import { changeEmployeeVisaDocuments, sendNotification, downloadFile } from '../../Services/hr';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEmployeeVisaStatuses, fetchInProgressEmployeeVisaStatuses, searchEmployeeVisaStatuses } from '../../redux/slice/HREmployeeApplicationSlice';
import Button from '@mui/material/Button';

function VisaStatusesManagement() {
  const inProgressEmployeeVisaStatuses = useSelector((state) => state.HREmployeeApplication.inProgressEmployeeVisaStatuses);
  const allEmployeeVisaStatusesSearched = useSelector((state) => state.HREmployeeApplication.allEmployeeVisaStatusesSearched);
  const dispatch = useDispatch();
  const [ feedback, setFeedback ] = useState("");

    useEffect(() => {
      dispatch(fetchInProgressEmployeeVisaStatuses());
      dispatch(fetchAllEmployeeVisaStatuses());
    }, []);

    const searchEmployees = (e) => {
      const name = e.target.value.toLowerCase();
      dispatch(searchEmployeeVisaStatuses(name));
    }

    const previewFile = async (document) => {
      if (document) {
        const document_blob = await downloadFile(document);
        const file = new Blob([document_blob], { type: "application/pdf" });
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    }

    const changeDocumentStatus = (status, id) => {
      const data = { status: status, feedback: feedback };
      changeEmployeeVisaDocuments(id, data);
    }

    const changeFeedback = (e) => {
      setFeedback(e.target.value);
    }

    return (
      <>
      <div style={{padding: '60px'}}>
        <div style={{margin: '15px'}}>View In-progress visa statuses</div>
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Recent Document</TableCell>
              <TableCell align="right">Next Step</TableCell>
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
                <TableCell align="right">{new Date(employeeProfile.workAuthorization.startDate).toLocaleDateString()}</TableCell>
                <TableCell align="right">{new Date(employeeProfile.workAuthorization.endDate).toLocaleDateString()}</TableCell>
                <TableCell align="right" onClick={e => previewFile(employeeProfile.recentDocument?.filePath)}>
                  {employeeProfile.recentDocument ? employeeProfile.recentDocument?.filePath : `N/A`}
                </TableCell>
                <TableCell align="right">{employeeProfile.nextStep}</TableCell>
                <TableCell align="right">
                  {employeeProfile.recentDocument &&
                  (<>
                    <Button variant="outlined" onClick={() => changeDocumentStatus('Approved', employeeProfile.recentDocument.id)} sx={{ margin: '5px' }}>Approve</Button>
                    <Input label='give feedback for reject' onChange={changeFeedback} size="small"/>
                    <Button variant="outlined" onClick={() => changeDocumentStatus('Rejected', employeeProfile.recentDocument.id)} sx={{ margin: '5px' }}>Reject</Button></>)
                  }
                  <Button variant="outlined" onClick={() => sendNotification(employeeProfile.email, employeeProfile.nextStep)} sx={{ margin: '5px' }}>Send Notification</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{marginTop: '25px'}}>View all employee visa statuses</div>
      <Input onChange={searchEmployees} sx={{ minWidth: 650, margin: '20px' }} label='search employee name'/>
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
            {allEmployeeVisaStatusesSearched.map((person) => (
              <TableRow
                key={person._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.name}
                </TableCell>
                <TableCell align="right">{person.workAuthorization.visaTitle}</TableCell>
                <TableCell align="right">{new Date(person.workAuthorization.startDate).toLocaleDateString()}</TableCell>
                <TableCell align="right">{new Date(person.workAuthorization.endDate).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  {person.recentDocument.map((document) => {
                    return <div onClick={e => previewFile(document)}>{document}</div>
                })}
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

export default VisaStatusesManagement;