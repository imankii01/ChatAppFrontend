import React from "react";

const ResumePreview = ({ resumeUrl }) => {
  const url =
    "hire_talent/resumeParser/rc-upload-1712077665109-19_resume-parser.pdf";
  return (
    <div>
      <h2>Resume Preview</h2>
      <iframe
        src={`${process.env.REACT_APP_IMAGES_BASE_URL}${url}`}
        title="Resume Preview"
        width="100%"
        height="500px"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default ResumePreview;
