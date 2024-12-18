import { useState } from 'react'
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel'
import './SignupPage.scss'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import { RxEyeOpen } from "react-icons/rx";
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
// import { GoEyeClosed } from "react-icons/go";
import { FaRegEyeSlash } from "react-icons/fa";
import { Container } from '@mui/material';
import { FaCircleCheck } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iseye, setIseye] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const isValidEmail = email.includes('@') && email.includes(".")
  const handleEye = () => {
    setIseye((prevState) => !prevState)
  }
  const handleCheck = () => {
    setCheck((prevCheck) => !prevCheck)
  }

  return (
    <Container className='sign_up' sx={{ display: "flex" }}>
      <div className="signup_left">
        <AuthLeftPanel />
      </div>
      <div className="signup_right">
        <div className="signup_topname">
          <h2 className='signup_name'>Create account</h2>
          <p className='signup_controlinfo'>Now your finances are in one place and always under control</p>
        </div>
        <div className="signup_form">
          <form onSubmit={handleLogin}>
            <div className="signup_email">
              <p className='label_name'>Email address</p>
              <div className='circle_box'>
                <PrimaryInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isValidEmail && (<div style={{ position: "relative" }}>
                  <FaCircleCheck className='circle_icon' />
                </div>)
                }
              </div>
            </div>
            <div className="signup_password">
              <div className="paswordtop">
                <p className='label_name'>Password</p>
                <div className="singin_passwordinp">
                  <PrimaryInput
                    type={iseye ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='eyesonof' onClick={handleEye}>
                    {iseye ? <RxEyeOpen className='eye_icon' /> : <FaRegEyeSlash className='eye_icon' />}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="signup_check">
          <div onClick={handleCheck} className="signup_checkbox">
            {check && <IoCheckmark size={18} className='checkmark' />}
          </div>
          <div className="signup_checkaccsestext">
            <p className='confirmation_text'>I accept the terms and privacy policy</p>
          </div>
        </div>
        <div className="signup_btm">
          <PrimaryButton
            label='Create account'
            type='button'
            onClick={handleLogin}
          />
        </div>
        <div className="signup_navbuttom">
          <div>
            <p className='signup_alredytext '>Already have an account? </p>
          </div>
          <Link className='signup_nav' to="/signin">
            <p className=''>Sign in</p>
          </Link>
        </div>
      </div>
    </Container>
  )
}
export default SignupPage
