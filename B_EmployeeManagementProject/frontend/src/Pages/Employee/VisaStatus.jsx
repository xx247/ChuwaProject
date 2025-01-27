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
import { getVisaStatus} from "../../services/visaStatus.js";
import { Link as RouterLink } from "react-router-dom";

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
          console.log(visaStatus);
        } else {
          console.error("Failed to fetch visa status:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching visa status:", error);
      }
    };

    fetchVisaStatus();
  }, []);

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
  }else{
    
  }

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = async (type) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);
  //     formData.append("type", type); // Include the type in the form data

  //     const response = await uploadSingleFile(formData);
  //     if (response.status === 200) {
  //       alert(`${type} uploaded successfully!`);
  //       setVisaStatus((prev) => ({
  //         ...prev,
  //         [type]: response.data.document,
  //       }));
  //       setSelectedFile(null);
  //     } else {
  //       console.error("Failed to upload document:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading document:", error);
  //   }
  // };

  // const handleDownload = async (id) => {
  //   try {
  //     const response = await downloadFile(id);
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "document.pdf"); // Change file name as needed
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  // const renderDocumentStep = (type, document, index) => {
  //   const isPending = document?.status === "Pending";
  //   const isApproved = document?.status === "Approved";
  //   const isRejected = document?.status === "Rejected";

  //   return (
  //     <Box key={type} sx={{ mb: 4 }}>
  //       <Typography variant="h6">{type.replace(/([A-Z])/g, " $1")}</Typography>
  //       <Typography>Status: {document?.status || "Not Uploaded"}</Typography>

  //       {isPending && <Typography>Waiting for HR to approve your {type}.</Typography>}

  //       {isApproved && index < documentOrder.length - 1 && (
  //         <Typography>
  //           Please upload your {documentOrder[index + 1].replace(/([A-Z])/g, " $1")}.
  //         </Typography>
  //       )}

  //       {isRejected && (
  //         <Typography color="error">
  //           Rejected: {document?.feedback || "No feedback provided."}
  //         </Typography>
  //       )}

  //       {/* Upload Section */}
  //       {(isApproved || !document) && (
  //         <Box sx={{ mt: 2 }}>
  //           <Button variant="outlined" component="label">
  //             Upload File
  //             <input type="file" hidden onChange={handleFileChange} />
  //           </Button>
  //           {selectedFile && (
  //             <Typography sx={{ mt: 1 }}>
  //               Selected File: {selectedFile.name}
  //             </Typography>
  //           )}
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             onClick={() => handleUpload(type)}
  //             sx={{ mt: 2 }}
  //             disabled={!selectedFile}
  //           >
  //             Submit
  //           </Button>
  //         </Box>
  //       )}

  //       {document && document.filePath && (
  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           onClick={() => handleDownload(document._id)}
  //           sx={{ mt: 2 }}
  //         >
  //           Download File
  //         </Button>
  //       )}
  //     </Box>
  //   );
  // };

  // return (
  //   <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
  //     <Typography variant="h4" sx={{ mb: 3 }}>
  //       Visa Status Management
  //     </Typography>

  //     {documentOrder.map((type, index) =>
  //       renderDocumentStep(type, visaStatus[type], index)
  //     )}

  //     {/* Feedback Dialog */}
  //     <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  //       <DialogTitle>HR Feedback</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText>{feedback}</DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setDialogOpen(false)}>Close</Button>
  //       </DialogActions>
  //     </Dialog>
  //   </Box>
  // );
};

export default VisaStatusManagement;
