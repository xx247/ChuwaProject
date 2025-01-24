// src/pages/ApplicationForm.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  FormLabel 
} from "@mui/material";
import { submitApplication } from '../../services/application';

const ApplicationForm = () => {
  const [workAuthorization, setWorkAuthorization] = useState("");
  const [visaTitle, setVisaTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const handleWorkAuthChange = (event) => {
    setWorkAuthorization(event.target.value);
  };

  const handleFileUpload = (event) => {
    setUploadedFiles([...uploadedFiles, ...event.target.files]);
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { firstName: "", lastName: "", phone: "", email: "", relationship: "" },
    ]);
  };


  const [formData, setFormData] = useState({
      personalInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        preferredName: "",
        profilePicture: null,
        address: {
          building: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        cellPhone: "",
        workPhone: "",
        ssn: "",
        dob: "",
        gender: "",
        citizenshipStatus: "",
        workAuthorization: {
          visaTitle: "",
          startDate: "",
          endDate: "",
          files: [],
        },
        reference: {
          firstName: "",
          lastName: "",
          middleName: "",
          phone: "",
          email: "",
          relationship: "",
        },
        emergencyContacts: [
          {
            firstName: "",
            lastName: "",
            middleName: "",
            phone: "",
            email: "",
            relationship: "",
          },
        ],
    },
    documents: []
  });

  const handleChange = (e, fieldPath) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData((prev) => {
      const updatedData = { ...prev };
      let current = updatedData;
      const fields = fieldPath.split(".");
      fields.slice(0, -1).forEach((field) => {
        current = current[field];
      });
      current[fields[fields.length - 1]] = value;
      return updatedData;
    });
  };
      

  const handleSubmit = async(e) => { 
      try{
        e.preventDefault();
        const response = await submitApplication(formData);
        console.log(response);     
        if (response.status === 200) {
          alert('Submit successful!');
          navigate('/personalInfo', {replace:true});
        } else if (response.status === 400) {
          alert(`Submit failed: ${response.data.message}`);
        }
      }
      catch (error) {
        alert("Server error. Please try again later.");
      };
    };


  const currencies = [
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
    {
      value: 'i do not wish to answer',
      label: 'i do not wish to answer',
    }
  ];

  return (
    <Box
      sx={{
        maxWidth: 800,    
        margin: "auto",
        padding: 4,
        //height: "100vh",
        backgroundColor: "#fff",
        marginTop: "20px"
        
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Fill Application
      </Typography>

      {/* Personal Information */}
      <Typography variant="h6">Personal Information</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField label="First Name" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Middle Name" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Preferred Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input type="file" hidden />
          </Button>
        </Grid>
      </Grid>

      {/* Address */}
      <Typography variant="h6">Current Address</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <TextField label="Building/Apt #" fullWidth required/>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Street Name" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="City" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="State" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Zip Code" fullWidth required/>
        </Grid>
      </Grid>

      {/* Contact Information */}
      <Typography variant="h6">Contact Information</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField label="Cell Phone" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Work Phone" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" fullWidth />
        </Grid>
      </Grid>

      {/* Additional Details */}
      <Typography variant="h6">Additional Details</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField label="SSN" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} required/>
        </Grid>
        <Grid item xs={6}>
        <TextField
          id="outlined-select-currency"
          select
          label="Gender"
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
      </Grid>

      {/* Work Authorization */}
      <Typography variant="h6">Work Authorization</Typography>
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Permanent resident or citizen of the U.S.?</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                value={workAuthorization}
                onChange={handleWorkAuthChange}
            >
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
                <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
        </FormControl>

        {workAuthorization === "yes" && (            
          <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
                <InputLabel >Citizen type</InputLabel>
                <Select
              
              id="demo-simple-select"
              label="Citizen type"              
                >
              <MenuItem value={'Green Card'}>Green Card</MenuItem>
              <MenuItem value={'Citizen'}>Citizen</MenuItem>

            </Select>
            </FormControl>
          </Grid>         
        </Grid>       
        )}

      {workAuthorization === "no" && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Work Visa Type</InputLabel>
              <Select value={visaTitle} label="Work Visa Type" onChange={(e) => setVisaTitle(e.target.value)}>
                <MenuItem value="H1-B">H1-B</MenuItem>
                <MenuItem value="L2">L2</MenuItem>
                <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
                <MenuItem value="H4">H4</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {visaTitle === "F1(CPT/OPT)" && (
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload OPT Receipt
                <input type="file" hidden />
              </Button>
            </Grid>
          )}
          {visaTitle === "other" && (
            <Grid item xs={12}>
              <TextField label="Specify Visa Title" fullWidth />
            </Grid>
          )}
          <Grid item xs={6}>
          <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required/>
          </Grid>
          <Grid item xs={6}>
          <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required/>
          </Grid>
        </Grid>
      )}

      {/* References */}
      <Typography variant="h6">References</Typography>
      <FormLabel id="how-did-you-hear-label" sx={{ display: "block" }}>
        Who referred you to this company?
      </FormLabel>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField label="First Name" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" fullWidth required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Middle Name" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Phone" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Email" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="relationship" fullWidth required />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>

      {/* Emergency Contacts */}
      <Typography variant="h6">Emergency Contacts</Typography>
      <Button variant="contained" onClick={addEmergencyContact} sx={{ mb: 2 }}>
          Add Emergency Contact
      </Button>
      {emergencyContacts.map((contact, index) => (
        <Grid container spacing={2} sx={{ mb: 3 }} key={index}>
          <Grid item xs={6}>
            <TextField label="First Name" fullWidth required />
             </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Middle Name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Phone" fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Relationship" fullWidth required />
          </Grid>
          
          <Grid item xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              const updatedContacts = [...emergencyContacts];
              updatedContacts.splice(index, 1); // Remove the contact at the current index
              setEmergencyContacts(updatedContacts);
            }}
          >
            Remove Contact
          </Button>
          </Grid>
        </Grid>
      ))}

      {/* Summary of Uploaded Files */}
      <Typography variant="h6">Uploaded Documents</Typography>
      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Upload Documents
        <input type="file" multiple hidden onChange={handleFileUpload} />
      </Button>
      <Box>
        {uploadedFiles.map((file, index) => (
          <Typography key={index}>{file.name}</Typography>
        ))}
      </Box>

      {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

    </Box>
    
  );
};

export default ApplicationForm;
