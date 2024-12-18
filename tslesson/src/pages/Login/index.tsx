import { Container } from '@mui/material'
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel'
import Heading from '../../components/Heading'
import { useState } from 'react'
import Paragrafy from '../../components/Paragrafy/Paragrafy'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import Check from '../../components/Check/Check'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import CustomLink from '../../components/CustomLink/CustomLink'


const Login = () => {
  const [signUp, setSignUp] = useState<boolean>(true);
  const [link, setLink] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const isValidEmail = email.includes('@') && email.includes(".")
  const [iseye, setIseye] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const handleLink = () => {
    setLink((prevState) => !prevState)
  }
  const handleEye = () => {
    setIseye((prevState) => !prevState)
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <Container >
      <div className="signup_left">
        <AuthLeftPanel />
      </div>
      <div className='signin_right'>
        <Heading text={signUp ? "Create account" : "Sign in"} />'

        <Paragrafy text={"Now your finances are in one place and always under control"} />
        <PrimaryInput label='Email' onChange={(e) => setEmail(e.target.value)} isValid isValidEmail={isValidEmail} />
        <PrimaryInput type='password' label='Password' onChange={(e) => setPassword(e.target.value)} isEyeicon iseye={iseye} handleEye={handleEye} />
        {signUp && <Check />}
        {/* burada signup check sertini deyismeliyik cunki sign inde basqadi orada togle var ?: bu sert yazilmaliir */}
        <PrimaryButton label="Create Acount" onClick={handleLogin} />
        <div>
          <Paragrafy text='Already have an account? ' />
          <CustomLink onChange={() => handleLink()} element={false} />
        </div>
      </div>

    </Container>
  )
}

export default Login