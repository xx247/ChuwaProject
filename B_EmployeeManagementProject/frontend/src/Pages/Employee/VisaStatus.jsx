import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Link,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getVisaStatus } from "../../services/visaStatus.js";
import { Link as RouterLink } from "react-router-dom";
import { uploadFile } from "../../services/files";

const VisaStatusManagement = () => {
  const [visaStatus, setVisaStatus] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const documentOrder = ["optReceipt", "optEAD", "i983", "i20"];

  // Fetch visa status on component mount
  useEffect(() => {
    const fetchVisaStatus = async () => {
      try {
        const response = await getVisaStatus();
        if (response.status === 200) {
          setVisaStatus(response.data.visaStatus);
        } else {
          console.error("Failed to fetch visa status:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching visa status:", error);
      }
    };

    fetchVisaStatus();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
      if (response.status === 400) {
        alert(`Submit failed: ${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again later.");
    }
  };

  const openFeedbackDialog = (feedback) => {
    setFeedback(feedback);
    setDialogOpen(true);
  };

  const closeFeedbackDialog = () => {
    setDialogOpen(false);
  };

  if (Object.keys(visaStatus).length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100vh - 64px)`,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ maxWidth: 400, padding: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your OPT files has never been submitted.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/submit-application"
            >
              Submit OPT files Now
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Not OPT visa?{" "}
              <Link
                component={RouterLink}
                to="/personalInfo"
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                Back to personal Info page
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const renderDocumentStep = (key, index) => {
    console.log("=========visa:", visaStatus);
    const document = visaStatus[key];
    console.log("====document:", document);
    if (!document) return null;

    const isPending = document.status === "Pending";
    const isApproved = document.status === "Approved";
    const isRejected = document.status === "Rejected";

    return (
      <Box key={key} sx={{ mb: 4 }}>
        <Typography variant="h6">{documentOrder[index]}</Typography>
        <Typography>
          Status: <strong>{document.status}</strong>
        </Typography>

        {isPending && (
          <Typography>
            Waiting for HR to approve your {documentOrder[index]}.
          </Typography>
        )}

        {isApproved && index < documentOrder.length - 1 && (
          <Typography>
            Please upload your {documentOrder[index + 1]}.
          </Typography>
        )}

        {isRejected && (
          <Box sx={{ mt: 2 }}>
            {/* <Typography>
              Rejected feedback: <strong>{document.feedback}</strong>
            </Typography> */}
            <Button variant="outlined" component="label">
              ReUpload {documentOrder[index]}
              <input
                type="file"
                hidden
                onChange={(e) => {
                  handleFileUpload(e, documentOrder[index + 1]);
                }}
              />
            </Button>
          </Box>
        )}

        {/* Upload Section */}
        {isApproved && index < documentOrder.length && (
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" component="label">
              Upload {documentOrder[index + 1]}
              <input
                type="file"
                hidden
                onChange={(e) => {
                  handleFileUpload(e, documentOrder[index + 1]);
                }}
              />
            </Button>
          </Box>
        )}

        {/* Templates for I-983 */}
        {key === "i983" && isApproved && (
          <Box sx={{ mt: 2 }}>
            <Typography>Templates:</Typography>
            <Button href="/templates/empty-template.pdf" download>
              Download Empty Template
            </Button>
            <Button href="/templates/sample-template.pdf" download>
              Download Sample Template
            </Button>
          </Box>
        )}

        {isRejected && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => openFeedbackDialog(document.feedback)}
          >
            View Feedback
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Visa Status Management
      </Typography>

      {documentOrder.map((key, index) => renderDocumentStep(key, index))}

      {/* Feedback Dialog */}
      <Dialog open={dialogOpen} onClose={closeFeedbackDialog}>
        <DialogTitle>HR Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>{feedback}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFeedbackDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VisaStatusManagement;
