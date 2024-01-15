import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import { LocalStorageKey, MESSAGE } from '../../constants/general.constant';
import { IParamLogin } from '../../interfaces/api.interfaces';
import { LOGO_SECONDARY_IMAGE_URL } from '../../mocks';
import styles from './login.module.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const postApiLogin = (formData: IParamLogin) => {
    authApi.postApiLogin(formData)
      .then(res => {
        navigate('/');
        localStorage.setItem(LocalStorageKey.USER_NAME, JSON.stringify(res.data.user.username))
        localStorage.setItem(LocalStorageKey.TOKEN, res.data.access_token);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        toast.error(err.response?.data?.message || MESSAGE.ERR_NETWORK);
      })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    const formData = {
      username,
      password
    };

    document.querySelector("form")?.classList.add("was-validated");
    if (!username || !password) return;

    setLoading(true);
    postApiLogin(formData);

  };

  return (
    <div className='d-grid gap-2 col-4 mx-auto mt-5 p-3'>
      <div className="d-flex align-items-center justify-content-center">
        <img alt='logo' className={styles.logo} src={LOGO_SECONDARY_IMAGE_URL} />
        <h5>Stack Overflow</h5>
      </div>

      <form className='d-grid gap-2 p-4 mt-4 bg-light shadow-sm rounded' >
        <div className="form-group">
          <label htmlFor="username" className="fw-bold pb-1">Username</label><br />
          <input onChange={e => setUsername(e.target.value)} type="text" name="username" id="username" className={`${styles.reset} form-control`} required />
          <div className="invalid-feedback"> Please fill a username.</div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="fw-bold pb-1">Password</label><br />
          <div className="position-relative">
            <input onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} name="password" id="password" className={`${styles.reset} form-control pe-5`} required />
            <span className={styles.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
              <i className="bi bi-eye-fill"></i>
            </span>
            <div className="invalid-feedback"> Please fill a password.</div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>
          <span>Login</span>
          {loading && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>}
        </button>
      </form>

      <div className='text-center'>
        <p>Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
