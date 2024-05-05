import React from "react";
import { Alert, Typography, Divider } from "antd";
import ProtecTedHeader from "../../Components/Header/protectedHeader";

const { Paragraph } = Typography;

const VerificationErrorPage = () => {
  return (
    <>
      <div className="min-h-full header-width">
        <ProtecTedHeader />
        <div style={{ width: "50%", margin: "auto", marginTop: "50px" }}>
          <Alert
            message="Account Verification Required"
            description={
              <>
                <Paragraph>
                  We need to verify your account to restore access. Your account
                  may have been flagged for security purposes, or there may be
                  information required to ensure the safety of your account and
                  personal data.
                </Paragraph>
                <Divider />
                <Paragraph>
                  Please wait for our support team to reach out to you within
                  the next 24 hours. If you have any urgent concerns or
                  questions, you can contact our support team at
                  support@example.com or call +123456789.
                </Paragraph>
              </>
            }
            type="error"
            showIcon
          />
        </div>
      </div>
    </>
  );
};

export default VerificationErrorPage;
