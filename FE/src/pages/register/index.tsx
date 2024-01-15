import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import { MESSAGE } from '../../constants/general.constant';
import { passwordValidation } from '../../helper/utils';
import styles from './register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { IParamRegister } from '../../interfaces/api.interfaces';

function Register() {
  const navigate = useNavigate();

  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [msgInvalidPassword, setMsgInvalidPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const registerObject = {
      username,
      password,
      email
    };

    document.querySelector("form")?.classList.add("was-validated")
    if (!username || !password || !email || !passwordValidation(password)) {
      setMsgInvalidPassword(MESSAGE.INVALID_PASSWORD);
      return;
    };
    setLoading(true);
    setMsgInvalidPassword("");
    handleRegister(registerObject);
  }

  const handleRegister = (registerObject: IParamRegister) => {
    authApi.postApiRegister(registerObject)
      .then(res => {
        setLoading(false);
        setIsRegister(true);
        toast.success(res.data?.message);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data?.message || MESSAGE.ERR_NETWORK);
      })
  }

  const renderRegister = () => (
    <div>
      <h5 className='text-center'>Create your Stack Overflow account. It's free and only takes a minute.
      </h5>

      <form className='d-grid gap-2 p-4 mt-4 bg-light shadow-sm rounded' >
        <div className="form-group">
          <label htmlFor="username" className="fw-bold pb-1">User name</label><br />
          <input onChange={e => setUserName(e.target.value)} type="text" name="username" id="username" className={`${styles.reset} form-control`} required />
          <div className="invalid-feedback"> Please fill a username.</div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="fw-bold pb-1">Email</label><br />
          <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className={`${styles.reset} form-control`} required />
          <div className="invalid-feedback"> Please fill a email.</div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="fw-bold pb-1">Password</label><br />
          <div className="position-relative">
            <input onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} name="password" id="password" className={`${styles.reset} form-control pe-5`} required autoComplete='off' />
            <span className={styles.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
              <i className="bi bi-eye-fill"></i>
            </span>
          </div>
          <div className="invalid-feedback"> Please fill a password.</div>
          <div className={`${styles.font14} invalid-password text-danger`}> {msgInvalidPassword} </div>
          <span className={`${styles.note}`}>Passwords must contain at least six characters, including at least 1 letter upper, 1 special character and 1 number.</span>
        </div>

        <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>
          <span>Register</span>
          {loading && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>}
        </button>
      </form>

      <div className="text-center px-4">
        <p className={`${styles.note} m-0`}>By clicking “Register”, you agree to our
          <Link to="./#"> terms of service, privacy policy and cookie policy</Link>
        </p>
        <p className='m-0'>Already have an account?
          <Link className='text-decoration-none' to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );

  const renderRegisterSuccess = () => (
    <div className='text-center'>
      <h3 className='my-3'>Hi, {username}!</h3>
      <p className='m-0'>You have successfully created a account.</p>
      <p>Please click on the link in your Email to activate your account!</p>
      <button className="btn btn-primary" type="button" onClick={() => navigate("/login")}>Go To Login</button>
    </div>
  )

  return (
    <div className='d-grid gap-2 col-4 mx-auto mt-5 p-3'>
      {isRegister ? renderRegisterSuccess() : renderRegister()}
      <ToastContainer />
    </div>
  )
}

export default Register