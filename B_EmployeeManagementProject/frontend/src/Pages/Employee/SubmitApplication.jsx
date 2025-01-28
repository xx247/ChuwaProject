import React, { useState } from "react";
import { useSelector } from "react-redux";

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
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { submitApplication } from "../../services/application";
import { uploadFile } from "../../services/files";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [workAuthorization, setWorkAuthorization] = useState("");
  const [visaTitle, setVisaTitle] = useState("");
  //const [fileType, setFileType] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [errors, setErrors] = useState({});

  const handleWorkAuthChange = (e) => {
    const value = e.target.value;
    setWorkAuthorization(value);

    setFormData((prev) => {
      const updatedData = { ...prev };

      // If "yes", reset work visa-related fields
      if (value === "yes") {
        updatedData.personalInfo.workAuthorization.visaTitle = "";
        updatedData.personalInfo.workAuthorization.startDate = "";
        updatedData.personalInfo.workAuthorization.endDate = "";
      }

      // If "no", reset citizenship type
      if (value === "no") {
        updatedData.personalInfo.workAuthorization.citizenType = "";
      }

      return updatedData;
    });
  };

  const handleFileUpload = async (e, fileType) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file); // The file itself
    formData.append("type", fileType); // The type of the file

    try {
      e.preventDefault();
      const response = await uploadFile(formData);

      if (response.status === 201) {
        alert("File uploaded successfully!");

        // Add the uploaded file to the list
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            type: fileType,
            id: response.data.fileId || prev.length,
          },
        ]);
        console.log("uploadedFiles", uploadedFiles);
      } else if (response.status === 400) {
        alert(`Submit failed: ${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again later.");
    }
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        emergencyContacts: [
          ...prev.personalInfo.emergencyContacts,
          { firstName: "", lastName: "", phone: "", email: "", relationship: "" },
        ],
      },
    }));
  };

  const [formData, setFormData] = useState({
    personalInfo: {
      email: user.email,
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
      workAuthorization: {
        visaTitle: "",
        citizenType: "",
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
    documents: [],
  });

  const handleChange = (e, fieldPath) => {
    console.log(e);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      alert("Please correct the errors before submitting.");
      return;
    }


    try {
      const response = await submitApplication(formData);
      if (response.status === 200) {
        alert("Submit successful!");
        navigate("/personalInfo", { replace: true });
      } else if (response.status === 400) {
        alert(`Submit failed: ${response.data.message}`);
      } else if (response.status === 500) {
        alert("Please fill out all required fields.");
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again later.");
    }
  };

  const genders = [
    {
      value: "Male",
      label: "male",
    },
    {
      value: "Female",
      label: "female",
    },
    {
      value: "I do not wish to answer",
      label: "i do not wish to answer",
    },
  ];

  const validateInputs = () => {
    const newErrors = {};
    const { personalInfo } = formData;

    // Required field validation
    if (!personalInfo.firstName) newErrors.firstName = "First Name is required";
    if (!personalInfo.lastName) newErrors.lastName = "Last Name is required";
    if (!personalInfo.cellPhone) newErrors.cellPhone = "Cell Phone is required";
    if (!personalInfo.ssn) newErrors.ssn = "SSN is required";
    if (!personalInfo.dob) newErrors.dob = "Date of Birth is required";
    if (!personalInfo.gender) newErrors.gender = "Gender is required";

    // Address validation
    const { building, street, city, state, zip } = personalInfo.address;
    if (!building) newErrors.building = "Building/Apt # is required";
    if (!street) newErrors.street = "Street Name is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!zip) newErrors.zip = "Zip Code is required";

    // Work Authorization validation
    const { visaTitle, citizenType, startDate, endDate } =
      personalInfo.workAuthorization;
    if (workAuthorization === "no" && !visaTitle)
      newErrors.visaTitle = "Visa Title is required";
    if (workAuthorization === "yes" && !citizenType)
      newErrors.citizenType = "Citizen Type is required";
    if (!startDate) newErrors.startDate = "Start Date is required";
    if (!endDate) newErrors.endDate = "End Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        //height: "100vh",
        backgroundColor: "#fff",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Fill Application
      </Typography>

      {/* Personal Information */}
      <Typography variant="h6">Personal Information</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
            onChange={(e) => handleChange(e, "personalInfo.firstName")}
            value={formData.personalInfo.firstName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
            onChange={(e) => handleChange(e, "personalInfo.lastName")}
            value={formData.personalInfo.lastName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Middle Name"
            fullWidth
            onChange={(e) => handleChange(e, "personalInfo.middleName")}
            value={formData.personalInfo.middleName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Preferred Name"
            fullWidth
            onChange={(e) => handleChange(e, "personalInfo.preferredName")}
            value={formData.personalInfo.preferredName}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleFileUpload(e, "profilePicture");
              }}
            />
          </Button>
        </Grid>
      </Grid>

      {/* Address */}
      <Typography variant="h6">Current Address</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <TextField
            label="Building/Apt #"
            fullWidth
            required
            error={!!errors.building}
            helperText={errors.building}
            onChange={(e) => handleChange(e, "personalInfo.address.building")}
            value={formData.personalInfo.address.building}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Street Name"
            fullWidth
            required
            error={!!errors.street}
            helperText={errors.street}
            onChange={(e) => handleChange(e, "personalInfo.address.street")}
            value={formData.personalInfo.address.street}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            fullWidth
            required
            error={!!errors.city}
            helperText={errors.city}
            onChange={(e) => handleChange(e, "personalInfo.address.city")}
            value={formData.personalInfo.address.city}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            fullWidth
            required
            error={!!errors.state}
            helperText={errors.state}
            onChange={(e) => handleChange(e, "personalInfo.address.state")}
            value={formData.personalInfo.address.state}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Zip Code"
            fullWidth
            required
            error={!!errors.zip}
            helperText={errors.zip}
            onChange={(e) => handleChange(e, "personalInfo.address.zip")}
            value={formData.personalInfo.address.zip}
          />
        </Grid>
      </Grid>

      {/* Contact Information */}
      <Typography variant="h6">Contact Information</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="Cell Phone"
            fullWidth
            required
            error={!!errors.cellPhone}
            helperText={errors.cellPhone}
            onChange={(e) => handleChange(e, "personalInfo.cellPhone")}
            value={formData.personalInfo.cellPhone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Work Phone"
            fullWidth
            onChange={(e) => handleChange(e, "personalInfo.workPhone")}
            value={formData.personalInfo.workPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // label="Email"
            fullWidth
            value={user.email}
            disabled
          />
        </Grid>
      </Grid>

      {/* Additional Details */}
      <Typography variant="h6">Additional Details</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="SSN"
            fullWidth
            required
            error={!!errors.ssn}
            helperText={errors.ssn}
            onChange={(e) => handleChange(e, "personalInfo.ssn")}
            value={formData.personalInfo.ssn}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.dob}
            helperText={errors.dob}
            onChange={(e) => handleChange(e, "personalInfo.dob")}
            value={formData.personalInfo.dob}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Gender"
            fullWidth
            error={!!errors.gender}
            helperText={errors.hender}
            onChange={(e) => handleChange(e, "personalInfo.gender")}
            value={formData.personalInfo.gender}
            required
          >
            {genders.map((option) => (
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
        <FormLabel id="demo-row-radio-buttons-group-label">
          Permanent resident or citizen of the U.S.?
        </FormLabel>
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
            <FormControl
              fullWidth
              required
              error={!!errors.citizenType}
              helperText={errors.citizenType}
            >
              <InputLabel>Citizen type</InputLabel>
              <Select
                id="demo-simple-select"
                label="Citizen type"
                onChange={(e) =>
                  handleChange(e, "personalInfo.workAuthorization.citizenType")
                }
                value={formData.personalInfo.workAuthorization.citizenType}
              >
                <MenuItem value={"Green Card"}>Green Card</MenuItem>
                <MenuItem value={"Citizen"}>Citizen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      {workAuthorization === "no" && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">
                Work Visa Type
              </InputLabel>
              <Select
                value={formData.personalInfo.workAuthorization.visaTitle}
                label="Work Visa Type"
                onChange={(e) => {
                  handleChange(e, "personalInfo.workAuthorization.visaTitle");
                  setVisaTitle(e.target.value);
                  e.target.value === "F1(CPT/OPT)" && setFileType("optReceipt");
                }}
              >
                <MenuItem value="H1-B">H1-B</MenuItem>
                <MenuItem value="L2">L2</MenuItem>
                <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
                <MenuItem value="H4">H4</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {visaTitle == "F1(CPT/OPT)" && (
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload OPT Receipt
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    handleFileUpload(e, "optReceipt");
                  }}
                />
              </Button>
            </Grid>
          )}
          {visaTitle === "other" && (
            <Grid item xs={12}>
              <TextField label="Specify Visa Title" fullWidth />
            </Grid>
          )}
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              onChange={(e) =>
                handleChange(e, "personalInfo.workAuthorization.startDate")
              }
              value={formData.personalInfo.workAuthorization.startDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              onChange={(e) =>
                handleChange(e, "personalInfo.workAuthorization.endDate")
              }
              value={formData.personalInfo.workAuthorization.endDate}
            />
          </Grid>
        </Grid>
      )}

      {/*Upload Files */}
      <Typography variant="h6">Upload Documents</Typography>
      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Upload Document
        <input
          type="file"
          multiple
          hidden
          onChange={(e) => {
            handleFileUpload(e, "other");
          }}
        />
      </Button>
      {/* <Box>
        {uploadedFiles.map((file, index) => (
          <Typography key={index}>{file.name}</Typography>
        ))}
      </Box> */}

      {/* References */}
      <Typography variant="h6">References</Typography>
      <FormLabel id="how-did-you-hear-label" sx={{ display: "block" }}>
        Who referred you to this company?
      </FormLabel>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            required
            onChange={(e) =>
              handleChange(e, "personalInfo.reference.firstName")
            }
            value={formData.personalInfo.reference.firstName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            required
            onChange={(e) => handleChange(e, "personalInfo.reference.lastName")}
            value={formData.personalInfo.reference.lastName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Middle Name"
            fullWidth
            onChange={(e) =>
              handleChange(e, "personalInfo.reference.middleName")
            }
            value={formData.personalInfo.reference.middleName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            fullWidth
            onChange={(e) => handleChange(e, "personalInfo.reference.phone")}
            value={formData.personalInfo.reference.phone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            onChange={(e) => handleChange(e, "personalInfo.reference.email")}
            value={formData.personalInfo.reference.email}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="relationship"
            fullWidth
            required
            onChange={(e) =>
              handleChange(e, "personalInfo.reference.relationship")
            }
            value={formData.personalInfo.reference.relationship}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>

      {/* Emergency Contacts */}
      <Typography variant="h6">Emergency Contacts</Typography>
      <Button variant="contained" onClick={addEmergencyContact} sx={{ mb: 2 }}>
        Add Emergency Contact
      </Button>
      {formData.personalInfo.emergencyContacts.map((contact, index) => (
        <Grid container spacing={2} sx={{ mb: 3 }} key={index}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              onChange={(e) =>
                handleChange(
                  e,
                  `personalInfo.emergencyContacts.${index}.firstName`
                )
              }
              value={contact.firstName || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              required
              onChange={(e) =>
                handleChange(
                  e,
                  `personalInfo.emergencyContacts.${index}.lastName`
                )
              }
              value={contact.lastName || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Middle Name"
              fullWidth
              onChange={(e) =>
                handleChange(
                  e,
                  `personalInfo.emergencyContacts.${index}.middleName`
                )
              }
              value={contact.middleName || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              fullWidth
              required
              onChange={(e) =>
                handleChange(e, `personalInfo.emergencyContacts.${index}.phone`)
              }
              value={contact.phone || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              required
              onChange={(e) =>
                handleChange(e, `personalInfo.emergencyContacts.${index}.email`)
              }
              value={contact.email || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Relationship"
              fullWidth
              required
              onChange={(e) =>
                handleChange(
                  e,
                  `personalInfo.emergencyContacts.${index}.relationship`
                )
              }
              value={contact.relationship || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                const updatedContacts = [
                  ...formData.personalInfo.emergencyContacts,
                ];
                updatedContacts.splice(index, 1); // Remove the contact at the current index
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    emergencyContacts: updatedContacts,
                  },
                }));
              }}
            >
              Remove Contact
            </Button>
          </Grid>
        </Grid>
      ))}

      {/* Uploaded Files Summary */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Uploaded Files</Typography>
        {uploadedFiles.length > 0 ? (
          <List>
            {uploadedFiles.map((file) => (
              <ListItem key={file.id}>
                <ListItemText
                  primary={file.name}
                  secondary={`Type: ${file.type}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
            No files uploaded yet.
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
