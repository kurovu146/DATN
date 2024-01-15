import { Link, useNavigate } from 'react-router-dom';
import { checkToken, getUserInfo } from '../../helper/utils';
import { LOGO_IMAGE_URL } from '../../mocks';
import styles from './header.module.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className={`${styles.header} p-2 bg-white position-fixed w-100 top-0 text-black border-bottom`}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Link to="/" className="mx-2">
            <img className={styles.logo} src={LOGO_IMAGE_URL} alt="stackoverflow" />
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0">
            <li><span className={`${styles.link} nav-link px-2 py-1 text-secondary`}>About</span></li>
            <li><span className={`${styles.link} nav-link px-2 py-1 text-secondary`}>Products</span></li>
            <li><span className={`${styles.link} nav-link px-2 py-1 text-secondary`}>For Teams</span></li>
          </ul>

          <form className="mx-3 position-relative flex-fill">
            <i className={`${styles.searchIcon} bi bi-search`}></i>
            <input className={`${styles.searchInput} form-control form-control-sm`} type="text" placeholder="Search..." />
          </form>

          <div className="text-end">
            {checkToken() ?
              <div className='d-flex align-items-center'>
                <span className='me-3 fw-bold'>{getUserInfo()}</span>
                <button type="button" className="btn btn-outline-secondary me-2  btn-sm" onClick={handleLogout}>Logout</button>
              </div> :
              <div>
                <Link to="/login">
                  <button type="button" className={`${styles.ctButton} btn btn-outline-primary me-2  btn-sm`}>Login</button>
                </Link>
                <Link to="/register">
                  <button type="button" className="btn btn-primary  btn-sm">Sign-up</button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header