import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const UploadProgress = ({ value,progressCurrentLenght,progressTotalLenght }) => {
  const [progress, setProgress] = React.useState(value);

  const handleCancelUpload = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <div className="upload_progress_container">
        <div className="upload_progress">
        <h6> Uploading...({`${progressCurrentLenght+1}/${progressTotalLenght}`}) </h6>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={value} />
          </Box>
          <div className="upload_cancle">
            <CancelIcon onClick={handleCancelUpload} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProgress;
