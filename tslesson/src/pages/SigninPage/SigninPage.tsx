
import { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import './SigninPage.scss'
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel';
import { RxEyeOpen } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import Container from '@mui/material/Container';
import { FaCircleCheck } from "react-icons/fa6";

const SigninPage = () => {
    const [email, setEmail] = useState<string>("");
    const [isOn, setIsOn] = useState<boolean>(false);
    const [iseye, setIseye] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const isValidEmail = email.includes('@') && email.includes(".")

    const handleToggle = () => {
        setIsOn((prevState) => !prevState)
    }
    const handleEye = () => {
        setIseye((prevState) => !prevState)
    }

    return (
        <Container className='sign_in' sx={{ display: "flex" }}>
            <div className="signin_left">
                <AuthLeftPanel />
            </div>
            <div className="signin_right">
                <div className="singin_topname">
                    <h2 className='signin_name'>Sign in</h2>
                    <p className='signin_controlinfo'>Now your finances are in one place and always under control</p>
                </div>
                <div className="signin_form">
                    <form onSubmit={handleLogin}>
                        <div className="singin_email">
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
                        <div className="singin_password">
                            <div className="paswordtop">
                                <p className='label_name'>Password</p>
                                <div className="singin_passwordinp">
                                    <PrimaryInput
                                        value={password}
                                        type={iseye ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className='eyesonof' onClick={handleEye}>
                                        {iseye ? <RxEyeOpen className='eye_icon' /> : <FaRegEyeSlash className='eye_icon' />}
                                    </div>
                                </div>
                            </div>
                            <Link style={{ textDecoration: "none" }} className='forgot_link' to="/">
                                <p className='forgot_pasword'>Forgot password?</p>
                            </Link>
                        </div>

                    </form>
                </div>
                <div className="signin_btm">
                    <PrimaryButton
                        label='Create account'
                        type='button'
                        onClick={handleLogin}
                    />
                </div>
                <div className="signin_check">
                    <div onClick={handleToggle} className="sign_toggle">
                        {isOn ? <MdToggleOn className='togle_icon' /> : <MdToggleOff className='togle_iconof' />}
                    </div>
                    <div className="signin_checkaccsestext">
                        <p className='confirmation_textone'>Weekly summary</p>
                        <p className='confirmation_texttwo'>Get a weekly avtivity report via email.</p>
                    </div>
                </div>
                <div className="signin_navbuttom">
                    <div>
                        <p className='sign_alredytext'>Already have an account? </p>
                    </div>
                    <Link className='signin_nav' to="/">
                        <p className=''>Sign up</p>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default SigninPage