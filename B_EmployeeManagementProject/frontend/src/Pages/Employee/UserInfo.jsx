import React, { useState } from "react";
import { getUserInfo } from "../../services/userInfo";

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

const UserInfo = () => {
  const initialData = {
    name: {
      firstName: "John",
      lastName: "Doe",
      middleName: "Michael",
      preferredName: "Johnny",
      profilePicture: null,
      email: "john.doe@example.com",
      ssn: "123-45-6789",
      dob: "1990-01-01",
      gender: "Male",
    },
    address: {
      building: "123",
      street: "Main St",
      city: "Springfield",
      state: "IL",
      zip: "62704",
    },
    contactInfo: {
      cellPhone: "123-456-7890",
      workPhone: "987-654-3210",
    },
    employment: {
      visaTitle: "H1-B",
      startDate: "2023-01-01",
      endDate: "2024-01-01",
    },
    emergencyContact: {
      firstName: "Jane",
      lastName: "Smith",
      middleName: "Anne",
      phone: "111-222-3333",
      email: "jane.smith@example.com",
      relationship: "Friend",
    },
    documents: [
      { name: "Driver's License", url: "/documents/driver-license.pdf" },
      { name: "Work Authorization", url: "/documents/work-authorization.pdf" },
    ],
  };

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState({});
  const [tempData, setTempData] = useState(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
    setCurrentSection(section);
  };

  const handleCancel = () => {
    setDialogOpen(true);
  };

  const confirmCancel = () => {
    setData(initialData);
    setEditMode({ ...editMode, [currentSection]: false });
    setDialogOpen(false);
  };

  const handleSave = (section) => {
    setData({ ...data, [section]: tempData[section] });
    setEditMode({ ...editMode, [section]: false });
  };

  const handleFieldChange = (e, section, field) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value,
      },
    }));
  };

  const handleFileUpload = (e, section, field) => {
    const file = e.target.files[0];
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file,
      },
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Personal Information
      </Typography>

      {/* Name Section */}
      <Section
        title="Name"
        editMode={editMode.name}
        onEdit={() => handleEdit("name")}
        onSave={() => handleSave("name")}
        onCancel={handleCancel}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={editMode.name ? tempData.name.firstName : data.name.firstName}
              onChange={(e) => handleFieldChange(e, "name", "firstName")}
              fullWidth
              disabled={!editMode.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={editMode.name ? tempData.name.lastName : data.name.lastName}
              onChange={(e) => handleFieldChange(e, "name", "lastName")}
              fullWidth
              disabled={!editMode.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Middle Name"
              value={editMode.name ? tempData.name.middleName : data.name.middleName}
              onChange={(e) => handleFieldChange(e, "name", "middleName")}
              fullWidth
              disabled={!editMode.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Preferred Name"
              value={editMode.name ? tempData.name.preferredName : data.name.preferredName}
              onChange={(e) => handleFieldChange(e, "name", "preferredName")}
              fullWidth
              disabled={!editMode.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" disabled={!editMode.name}>
              Upload Profile Picture
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload(e, "name", "profilePicture")}
              />
            </Button>
          </Grid>
        </Grid>
      </Section>

      {/* Address Section */}
      <Section
        title="Address"
        editMode={editMode.address}
        onEdit={() => handleEdit("address")}
        onSave={() => handleSave("address")}
        onCancel={handleCancel}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Building/Apt #"
              value={editMode.address ? tempData.address.building : data.address.building}
              onChange={(e) => handleFieldChange(e, "address", "building")}
              fullWidth
              disabled={!editMode.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Name"
              value={editMode.address ? tempData.address.street : data.address.street}
              onChange={(e) => handleFieldChange(e, "address", "street")}
              fullWidth
              disabled={!editMode.address}
            />
          </Grid>
        </Grid>
      </Section>

      {/* Documents Section */}
      <Section title="Documents">
        <Grid container spacing={2}>
          {data.documents.map((doc, index) => (
            <Grid item xs={12} key={index}>
              <Typography>
                {doc.name} -{" "}
                <Button href={doc.url} target="_blank">
                  Preview
                </Button>{" "}
                <Button href={doc.url} download>
                  Download
                </Button>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Discard Changes Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Discard Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discard all your changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>No</Button>
          <Button onClick={confirmCancel} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Reusable Section Component
const Section = ({ title, children, editMode, onEdit, onSave, onCancel }) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6">{title}</Typography>
      {!editMode ? (
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
      ) : (
        <Box>
          <IconButton onClick={onSave}>
            <Save />
          </IconButton>
          <IconButton onClick={onCancel}>
            <Cancel />
          </IconButton>
        </Box>
      )}
    </Box>
    <Box>{children}</Box>
  </Box>
);

export default UserInfo;
