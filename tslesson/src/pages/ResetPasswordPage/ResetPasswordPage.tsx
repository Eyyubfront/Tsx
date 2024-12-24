import { useForm, SubmitHandler } from "react-hook-form";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ResetPasswordPage.scss";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Container } from "@mui/material";
interface FormInput {
  email: string;
  password: string;
}

const ResetPasswordPage= () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Container>
      <div className="main-div">
          <LeftVerifyEmail />
        <div className="reset-pass">
          <div className="resetLeft-side">
            <CustomHeading
              text="Reset password"
              className="fgHead"
            />
            <CustomText
              text="Don’t worry! It happens. Please enter the email associated with your account."
              className="fgtext"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div className="form-group">
                <CustomInput
                  label="Password"
                  placeholder="Password"
                  type="email"
                  fontSize="14px"
                  border="1px solid #D8DADC"
                  borderRadius="7px"
                  outline="none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error-message" style={{color:"red"}}>{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <CustomInput
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  fontSize="14px"
                  border="1px solid #D8DADC"
                  borderRadius="7px"
                  outline="none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="error-message" style={{color:"red"}} >{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <CustomButton
                text="Reset Password"
                backgroundColor="#8B6DE8"
                color="#fff"
                className="custombtn"
                padding="15px"
                type="submit" 
              />
            </form>
          </div>
          <div className="resetRight-side">
            <p>
              Already have an account? <a href="/">Sign up</a>
            </p>
          </div>
        </div>
      </div>
  
    </Container>
  );
};

export default ResetPasswordPage;
