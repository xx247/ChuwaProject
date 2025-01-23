// src/pages/PersonalInfo.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getApplicationStatus } from "../../services/application";


const PersonalInfo = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getApplicationStatus();
        console.log(response);
        const data = await response.data;
        if (response.status === 200) {
          setStatus(data.message);
        } else {
          console.error("Failed to fetch status:", data.message);
        }
      } catch (err) {
        console.error("Error fetching status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleApplicationSubmission = () => {
    navigate("/submit-application");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "NeverSubmitted") {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your application has never been submitted.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplicationSubmission}
        >
          Submit Application Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h6">
        {status}
      </Typography>
    </Box>
  );
};

export default PersonalInfo;
