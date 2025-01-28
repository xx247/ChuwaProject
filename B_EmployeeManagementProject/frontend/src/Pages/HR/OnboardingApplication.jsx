import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Input from '@mui/material/TextField';
import { changeOnboardingApplications } from '../../Services/hr';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnboardingApplication } from '../../redux/slice/HREmployeeApplicationSlice';

function OnboardingApplication() {
  const id = useParams().id;
  const profile = useSelector((state) => state.HREmployeeApplication.onboardingApplication?.personalInfo) ?? {};
  const application = useSelector((state) => state.HREmployeeApplication.onboardingApplication?.onboardingApplication) ?? {};
  const documents = useSelector((state) => state.HREmployeeApplication.onboardingApplication?.documents) ?? [];
  const [ feedback, setFeedback ] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOnboardingApplication(id));
  }, []);

  const approveApplication = () => {
    changeOnboardingApplications(application._id, {status: 'Approved'});
  }

  const rejectApplication = () => {
    changeOnboardingApplications(application._id, {status: 'Rejected', feedback: feedback});
  }

  const changeFeedback = (e) => {
    setFeedback(e.target.value);
  }

  const previewFile = async (document='6799166d5da6a9e6d504325a') => {
    const document_blob = await downloadFile(document);
    const file = new Blob([document_blob], { type: "application/pdf" });
    const url = URL.createObjectURL(file);
    window.open(url);
  }

  return <>
  <div style={{padding: '60px'}}>
  <div>Onboarding Application</div>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
          'margin-top': '20px'
        }}>
        <Grid size={6}>
          <div>Name</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.firstName} {profile.middleName} {profile.lastName}</div>
        </Grid>
        <Grid size={6}>
          <div>Preferred Name</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.preferredName}</div>
        </Grid>
        <Grid size={6}>
          <div>Gender</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.gender}</div>
        </Grid>
        <Grid size={6}>
          <div>Date of Birth</div>
        </Grid>
        <Grid size={6}>
          <div>{new Date(profile.dob).toLocaleDateString()}</div>
        </Grid>
        <Grid size={6}>
          <div>Address</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.address?.building} {profile.address?.street}, {profile.address?.city} {profile.address?.state}, {profile.address?.zip} </div>
        </Grid>
        <Grid size={6}>
          <div>Cell Phone</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.cellPhone}</div>
        </Grid>
        <Grid size={6}>
          <div>Work Phone</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.workPhone}</div>
        </Grid>

        <Grid size={12}>
          <div>Work Authorization</div>
        </Grid>
        <Grid size={6}>
          <div>SSN</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.ssn}</div>
        </Grid>
        <Grid size={6}>
          <div>Visa Status</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.citizenshipStatus}</div>
        </Grid>

        <Grid size={12}>
          <div>Reference</div>
        </Grid>
        <Grid size={6}>
          <div>Name</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.reference?.firstName} {profile.reference?.middleName} {profile.reference?.lastName}</div>
        </Grid>
        <Grid size={6}>
          <div>Phone</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.reference?.phone}</div>
        </Grid><Grid size={6}>
          <div>Email</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.reference?.email}</div>
        </Grid><Grid size={6}>
          <div>Relation</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.reference?.relationship}</div>
        </Grid>

        <Grid size={12}>
          <div>Emergency Contact</div>
        </Grid>
        <Grid size={6}>
          <div>Name</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.emergencyContacts?.[0]?.firstName} {profile.emergencyContacts?.[0]?.middleName} {profile.emergencyContacts?.[0]?.lastName}</div>
        </Grid>
        <Grid size={6}>
          <div>Phone</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.emergencyContacts?.[0]?.phone}</div>
        </Grid><Grid size={6}>
          <div>Email</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.emergencyContacts?.[0]?.email}</div>
        </Grid>
        <Grid size={6}>
          <div>Relation</div>
        </Grid>
        <Grid size={6}>
          <div>{profile.emergencyContacts?.[0]?.relationship}</div>
        </Grid>

        <Grid size={12}>
          <div>Documents</div>
        </Grid>
        {documents.map((doc) => {
          return (
            <Grid size={12}>
              <div onClick={e => previewFile(doc)}>{doc}</div>
            </Grid>
          );
        })}

        <Grid size={12}>
          <div>Application Status</div>
        </Grid>
        <Grid size={6}>
          <div>Status</div>
        </Grid>
        <Grid size={6}>
          <div>{application.status}</div>
        </Grid>
        <Grid size={6}>
          <div>Feedback</div>
        </Grid>
        <Grid size={6}>
          <div>
            {application.feedback}
          </div>
        </Grid>
        <Grid size={6}>
          <div>Action</div>
        </Grid>
        <Grid size={6}>
          <div>
            <Button onClick={approveApplication}  variant="contained" sx={{ margin: '5px', padding: '15px' }}>Approve</Button>
            <Input label='give feedback for reject' onChange={changeFeedback}  sx={{ margin: '5px' }} />
            <Button onClick={rejectApplication}  variant="contained" sx={{ margin: '5px', padding: '15px' }}>Reject</Button>
          </div>
        </Grid>
      </Grid>
    </Box>
    </div>
  </>;
}

export default OnboardingApplication;