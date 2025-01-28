import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordEmail } from "../../store/actions/forgotPasswordActions/forgotPasswordActions";
import { RootState, AppDispatch } from "../../store/index";
import { useNavigate } from "react-router-dom";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ForgotPasswordPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomInput from "../../components/CustomInput";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

  const { loading, error, success } = useSelector(
    (state: RootState) => state.forgotPassword
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(sendForgotPasswordEmail({ email }));

  
    if (sendForgotPasswordEmail.rejected.match(result)) {
      setInputError(true); 
    }

    if (sendForgotPasswordEmail.fulfilled.match(result)) {
      const userId = result.payload.userId; 
      localStorage.setItem("userId", userId); 
      navigate("/resetpasswordpage");
    }
  };

  const handleResend = () => {
    dispatch(sendForgotPasswordEmail({ email })); 
  };

  return (
    <Container className="container">
      <div className="forgot-div">
        <LeftVerifyEmail
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
        <Button
          className="leftBt"
          sx={{
            border: "2px solid #D8DADC ",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <div className="forgot-pass">
          <Heading text="Forgot password ?" />
          <Paragrafy text="Don’t worry! It happens. Please enter the email associated with your account." />

          <form onSubmit={handleSubmit}>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              fontSize="16px"
              border="1px solid #ccc"
              borderRadius="7px"
              outline="none"
              className={`forgot-input ${inputError ? "input-error" : ""}`} 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputError(false); 
              }}
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">Code sent successfully!</p>}

            <PrimaryButton
              label={loading ? "Sending..." : "Verify Code"}
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
