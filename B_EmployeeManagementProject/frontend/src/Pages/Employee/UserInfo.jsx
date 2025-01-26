import React, { useState, useEffect } from "react";
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
import { Edit, Save, Cancel, LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { getUserInfo } from "../../services/userInfo";
import { updateUserInfo } from "../../services/userInfo";

const PersonalInfo = () => {
  const [initialData, setInitialData] = useState({});
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState({
    "Name": false,
    "Address": false,
    "Contact Info": false,
    "Employment": false,
    "Emergency Contacts": false,
  });
  const [tempData, setTempData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Fetch initial data from the backend
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        const data = await response.data;
        if (response.status === 200) {
          setInitialData(data.userInfo);
          setData(data.userInfo);
          setTempData(data.userInfo);
        } else {
          console.error("Failed to fetch user info:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
  };

  const handleCancel = (section) => {
    setDialogOpen(true);
    setActiveSection(section);
  };

  const confirmCancel = () => {
    setTempData(initialData);
    setEditMode({ ...editMode, [activeSection]: false });
    setActiveSection("");
    setDialogOpen(false);
  };

  const handleSave = async (section) => {
    try {
      const response = await updateUserInfo({userInfo: tempData});
  
      if (response.status === 200) {
        setData(tempData); // Apply changes locally
        setEditMode({ ...editMode, [section]: false });
        alert("Changes saved successfully!");
      } else {
        console.error("Failed to save changes:", response.data.message);
        alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleFieldChange = (e, field) => {
    // field can be nested, e.g., "address.street"
    const fields = field.split(".");
    setTempData((prev) => {
      let newData = { ...prev };
      let current = newData;
      for (let i = 0; i < fields.length - 1; i++) {
        current = current[fields[i]];
      }
      current[fields[fields.length - 1]] = e.target.value;
      return newData;
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Personal Information
      </Typography>

      {/* Name Section */}
      <Section
        title="Name"
        editMode={editMode}
        onEdit={() => handleEdit("Name")}
        onSave={() => handleSave("Name")}
        onCancel={() => handleCancel("Name")}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={editMode["Name"] ? tempData.firstName : data.firstName || ""}
              onChange={(e) => handleFieldChange(e, "firstName")}
              fullWidth
              disabled={!editMode["Name"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={editMode["Name"] ? tempData.lastName : data.lastName || ""}
              onChange={(e) => handleFieldChange(e, "lastName")}
              fullWidth
              disabled={!editMode["Name"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Middle Name"
              value={editMode["Name"] ? tempData.middleName : data.middleName || ""}
              onChange={(e) => handleFieldChange(e, "middleName")}
              fullWidth
              disabled={!editMode["Name"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Preferred Name"
              value={
                editMode["Name"] ? tempData.preferredName : data.preferredName || ""
              }
              onChange={(e) => handleFieldChange(e, "preferredName")}
              fullWidth
              disabled={!editMode["Name"]}
            />
          </Grid>
        </Grid>
      </Section>

      {/* Address Section */}
      <Section
        title="Address"
        editMode={editMode}
        onEdit={() => handleEdit("Address")}
        onSave={() => handleSave("Address")}
        onCancel={() => handleCancel("Address")}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Building/Apt #"
              value={
                editMode["Address"]
                  ? tempData.address?.building
                  : data.address?.building || ""
              }
              onChange={(e) => handleFieldChange(e, "address.building")}
              fullWidth
              disabled={!editMode["Address"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Name"
              value={
                editMode["Address"]
                  ? tempData.address?.street
                  : data.address?.street || ""
              }
              onChange={(e) => handleFieldChange(e, "address.street")}
              fullWidth
              disabled={!editMode["Address"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              value={
                editMode["Address"]
                  ? tempData.address?.city
                  : data.address?.city || ""
              }
              onChange={(e) => handleFieldChange(e, "address.city")}
              fullWidth
              disabled={!editMode["Address"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              value={
                editMode["Address"]
                  ? tempData.address?.state
                  : data.address?.state || ""
              }
              onChange={(e) => handleFieldChange(e, "address.state")}
              fullWidth
              disabled={!editMode["Address"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Zip Code"
              value={
                editMode["Address"]
                  ? tempData.address?.zip
                  : data.address?.zip || ""
              }
              onChange={(e) => handleFieldChange(e, "address.zip")}
              fullWidth
              disabled={!editMode["Address"]}
            />
          </Grid>
        </Grid>
      </Section>

      {/* Contact Info Section */}
      <Section
        title="Contact Info"
        editMode={editMode}
        onEdit={() => handleEdit("Contact Info")}
        onSave={() => handleSave("Contact Info")}
        onCancel={() => handleCancel("Contact Info")}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Cell Phone"
              value={editMode["Contact Info"] ? tempData.cellPhone : data.cellPhone || ""}
              onChange={(e) => handleFieldChange(e, "cellPhone")}
              fullWidth
              disabled={!editMode["Contact Info"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Work Phone"
              value={editMode["Contact Info"] ? tempData.workPhone : data.workPhone || ""}
              onChange={(e) => handleFieldChange(e, "workPhone")}
              fullWidth
              disabled={!editMode["Contact Info"]}
            />
          </Grid>
        </Grid>
      </Section>

      {/* Employment Section */}
      <Section
        title="Employment"
        editMode={editMode}
        onEdit={() => handleEdit("Employment")}
        onSave={() => handleSave("Employment")}
        onCancel={() => handleCancel("Employment")}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Visa Title"
              value={
                editMode["Employment"]
                  ? tempData.employment?.visaTitle
                  : data.employment?.visaTitle || ""
              }
              onChange={(e) => handleFieldChange(e, "visaTitle")}
              fullWidth
              disabled={!editMode["Employment"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="date"
              value={
                editMode["Employment"]
                  ? tempData.employment?.startDate
                  : data.employment?.startDate || ""
              }
              onChange={(e) => handleFieldChange(e, "startDate")}
              fullWidth
              disabled={!editMode["Employment"]}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="date"
              value={
                editMode["Employment"]
                  ? tempData.employment?.endDate
                  : data.employment?.endDate || ""
              }
              onChange={(e) => handleFieldChange(e, "endDate")}
              fullWidth
              disabled={!editMode["Employment"]}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Section>

      {/* Emergency Contact Section */}
      <Section
        title="Emergency Contacts"
        editMode={editMode}
        onEdit={() => handleEdit("Emergency Contacts")}
        onSave={() => handleSave("Emergency Contacts")}
        onCancel={() => handleCancel("Emergency Contacts")}
      >
        {data.emergencyContacts?.map((contact, index) => (
          <Grid container spacing={2} key={contact._id} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.firstName || ""
                    : contact.firstName || ""
                }
                onChange={(e) =>
                  handleFieldChange(e, `emergencyContacts.${index}.firstName`)
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.lastName || ""
                    : contact.lastName || ""
                }
                onChange={(e) =>
                  handleFieldChange(e, `emergencyContacts.${index}.lastName`)
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Middle Name"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.middleName || ""
                    : contact.middleName || ""
                }
                onChange={(e) =>
                  handleFieldChange(e, `emergencyContacts.${index}.middleName`)
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.phone || ""
                    : contact.phone || ""
                }
                onChange={(e) =>
                  handleFieldChange(e, `emergencyContacts.${index}.phone`)
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.email || ""
                    : contact.email || ""
                }
                onChange={(e) =>
                  handleFieldChange(e, `emergencyContacts.${index}.email`)
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Relationship"
                value={
                  editMode["Emergency Contacts"]
                    ? tempData.emergencyContacts[index]?.relationship || ""
                    : contact.relationship || ""
                }
                onChange={(e) =>
                  handleFieldChange(
                    e,
                    `emergencyContacts.${index}.relationship`
                  )
                }
                fullWidth
                disabled={!editMode["Emergency Contacts"]}
              />
            </Grid>

            {editMode["Emergency Contacts"] && (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    const updatedContacts = [...tempData.emergencyContacts];
                    updatedContacts.splice(index, 1);
                    setTempData((prev) => ({
                      ...prev,
                      emergencyContacts: updatedContacts,
                    }));
                  }}
                >
                  Remove Contact
                </Button>
              </Grid>
            )}
          </Grid>
        ))}

        {editMode.emergencyContacts && (
          <Button
            variant="contained"
            onClick={() => {
              setTempData((prev) => ({
                ...prev,
                emergencyContacts: [
                  ...prev.emergencyContacts,
                  {
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    phone: "",
                    email: "",
                    relationship: "",
                    _id: Math.random().toString(36).substring(2, 15), // Temporary ID for new contacts
                  },
                ],
              }));
            }}
          >
            Add Emergency Contact
          </Button>
        )}
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      { !editMode[title] ? (
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

export default PersonalInfo;
