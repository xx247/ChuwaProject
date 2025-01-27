import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router';

function Navigation() {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ position: 'fixed', top: '15px', left: '15px' }}>
      <Link underline="hover" color="inherit" href="/hr">
        Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/hr/employeeProfiles"
      >
        Employee Profile
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/hr/visaStatus"
      >
        Visa Status Management
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/hr/hiringManagement"
      >
        Hiring Management
      </Link>
      {isAuthenticated && <Link
        underline="hover"
        color="inherit"
        onClick={logOut}
      >
        Log Out
      </Link>}
    </Breadcrumbs>
  );
}

export default Navigation;