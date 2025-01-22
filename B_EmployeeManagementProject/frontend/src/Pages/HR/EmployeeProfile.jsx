import './EmployeeProfile.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getEmployeeProfileById } from '../../Services/hr';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

function EmployeeProfile() {
  const params = useParams();
  const profile_id = params.id;
  const [ profile, setProfile ] = useState({});

  useEffect(() => {
    getEmployeeProfileById(profile_id).then((data) => setProfile(data[0]));
  }, []);

  return (
    <>
      <div>Employee Profile</div>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            <div>{profile.dob}</div>
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
            <div>{profile.emergencyContacts?.firstName} {profile.emergencyContacts?.middleName} {profile.emergencyContacts?.lastName}</div>
          </Grid>
          <Grid size={6}>
            <div>Phone</div>
          </Grid>
          <Grid size={6}>
            <div>{profile.emergencyContacts?.phone}</div>
          </Grid><Grid size={6}>
            <div>Email</div>
          </Grid>
          <Grid size={6}>
            <div>{profile.emergencyContacts?.email}</div>
          </Grid><Grid size={6}>
            <div>Relation</div>
          </Grid>
          <Grid size={6}>
            <div>{profile.emergencyContacts?.relationship}</div>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EmployeeProfile;